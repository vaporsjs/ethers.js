"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { encode as base64Encode } from "@vaporsproject/base64";
import { hexlify, isBytesLike } from "@vaporsproject/bytes";
import { shallowCopy } from "@vaporsproject/properties";
import { toUtf8Bytes, toUtf8String } from "@vaporsproject/strings";
import { Logger } from "@vaporsproject/logger";
import { version } from "./_version";
const logger = new Logger(version);
import { getUrl } from "./geturl";
function staller(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
function bodyify(value, type) {
    if (value == null) {
        return null;
    }
    if (typeof (value) === "string") {
        return value;
    }
    if (isBytesLike(value)) {
        if (type && (type.split("/")[0] === "text" || type.split(";")[0].trim() === "application/json")) {
            try {
                return toUtf8String(value);
            }
            catch (error) { }
            ;
        }
        return hexlify(value);
    }
    return value;
}
// This API is still a work in progress; the future changes will likely be:
// - ConnectionInfo => FetchDataRequest<T = any>
// - FetchDataRequest.body? = string | Uint8Array | { contentType: string, data: string | Uint8Array }
//   - If string => text/plain, Uint8Array => application/octet-stream (if content-type unspecified)
// - FetchDataRequest.processFunc = (body: Uint8Array, response: FetchDataResponse) => T
// For this reason, it should be considered internal until the API is finalized
export function _fetchData(connection, body, processFunc) {
    // How many times to retry in the event of a throttle
    const attemptLimit = (typeof (connection) === "object" && connection.throttleLimit != null) ? connection.throttleLimit : 12;
    logger.assertArgument((attemptLimit > 0 && (attemptLimit % 1) === 0), "invalid connection throttle limit", "connection.throttleLimit", attemptLimit);
    const throttleCallback = ((typeof (connection) === "object") ? connection.throttleCallback : null);
    const throttleSlotInterval = ((typeof (connection) === "object" && typeof (connection.throttleSlotInterval) === "number") ? connection.throttleSlotInterval : 100);
    logger.assertArgument((throttleSlotInterval > 0 && (throttleSlotInterval % 1) === 0), "invalid connection throttle slot interval", "connection.throttleSlotInterval", throttleSlotInterval);
    const headers = {};
    let url = null;
    // @TODO: Allow ConnectionInfo to override some of these values
    const options = {
        method: "GET",
    };
    let allow304 = false;
    let timeout = 2 * 60 * 1000;
    if (typeof (connection) === "string") {
        url = connection;
    }
    else if (typeof (connection) === "object") {
        if (connection == null || connection.url == null) {
            logger.throwArgumentError("missing URL", "connection.url", connection);
        }
        url = connection.url;
        if (typeof (connection.timeout) === "number" && connection.timeout > 0) {
            timeout = connection.timeout;
        }
        if (connection.headers) {
            for (const key in connection.headers) {
                headers[key.toLowerCase()] = { key: key, value: String(connection.headers[key]) };
                if (["if-none-match", "if-modified-since"].indexOf(key.toLowerCase()) >= 0) {
                    allow304 = true;
                }
            }
        }
        options.allowGzip = !!connection.allowGzip;
        if (connection.user != null && connection.password != null) {
            if (url.substring(0, 6) !== "https:" && connection.allowInsecureAuthentication !== true) {
                logger.throwError("basic authentication requires a secure https url", Logger.errors.INVALID_ARGUMENT, { argument: "url", url: url, user: connection.user, password: "[REDACTED]" });
            }
            const authorization = connection.user + ":" + connection.password;
            headers["authorization"] = {
                key: "Authorization",
                value: "Basic " + base64Encode(toUtf8Bytes(authorization))
            };
        }
    }
    if (body) {
        options.method = "POST";
        options.body = body;
        if (headers["content-type"] == null) {
            headers["content-type"] = { key: "Content-Type", value: "application/octet-stream" };
        }
        if (headers["content-length"] == null) {
            headers["content-length"] = { key: "Content-Length", value: String(body.length) };
        }
    }
    const flatHeaders = {};
    Object.keys(headers).forEach((key) => {
        const header = headers[key];
        flatHeaders[header.key] = header.value;
    });
    options.headers = flatHeaders;
    const runningTimeout = (function () {
        let timer = null;
        const promise = new Promise(function (resolve, reject) {
            if (timeout) {
                timer = setTimeout(() => {
                    if (timer == null) {
                        return;
                    }
                    timer = null;
                    reject(logger.makeError("timeout", Logger.errors.TIMEOUT, {
                        requestBody: bodyify(options.body, flatHeaders["content-type"]),
                        requestMethod: options.method,
                        timeout: timeout,
                        url: url
                    }));
                }, timeout);
            }
        });
        const cancel = function () {
            if (timer == null) {
                return;
            }
            clearTimeout(timer);
            timer = null;
        };
        return { promise, cancel };
    })();
    const runningFetch = (function () {
        return __awaiter(this, void 0, void 0, function* () {
            for (let attempt = 0; attempt < attemptLimit; attempt++) {
                let response = null;
                try {
                    response = yield getUrl(url, options);
                    // Exponential back-off throttling
                    if (response.statusCode === 429 && attempt < attemptLimit) {
                        let tryAgain = true;
                        if (throttleCallback) {
                            tryAgain = yield throttleCallback(attempt, url);
                        }
                        if (tryAgain) {
                            let stall = 0;
                            const retryAfter = response.headers["retry-after"];
                            if (typeof (retryAfter) === "string" && retryAfter.match(/^[1-9][0-9]*$/)) {
                                stall = parseInt(retryAfter) * 1000;
                            }
                            else {
                                stall = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                            }
                            //console.log("Stalling 429");
                            yield staller(stall);
                            continue;
                        }
                    }
                }
                catch (error) {
                    response = error.response;
                    if (response == null) {
                        runningTimeout.cancel();
                        logger.throwError("missing response", Logger.errors.SERVER_ERROR, {
                            requestBody: bodyify(options.body, flatHeaders["content-type"]),
                            requestMethod: options.method,
                            serverError: error,
                            url: url
                        });
                    }
                }
                let body = response.body;
                if (allow304 && response.statusCode === 304) {
                    body = null;
                }
                else if (response.statusCode < 200 || response.statusCode >= 300) {
                    runningTimeout.cancel();
                    logger.throwError("bad response", Logger.errors.SERVER_ERROR, {
                        status: response.statusCode,
                        headers: response.headers,
                        body: bodyify(body, ((response.headers) ? response.headers["content-type"] : null)),
                        requestBody: bodyify(options.body, flatHeaders["content-type"]),
                        requestMethod: options.method,
                        url: url
                    });
                }
                if (processFunc) {
                    try {
                        const result = yield processFunc(body, response);
                        runningTimeout.cancel();
                        return result;
                    }
                    catch (error) {
                        // Allow the processFunc to trigger a throttle
                        if (error.throttleRetry && attempt < attemptLimit) {
                            let tryAgain = true;
                            if (throttleCallback) {
                                tryAgain = yield throttleCallback(attempt, url);
                            }
                            if (tryAgain) {
                                const timeout = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                                //console.log("Stalling callback");
                                yield staller(timeout);
                                continue;
                            }
                        }
                        runningTimeout.cancel();
                        logger.throwError("processing response error", Logger.errors.SERVER_ERROR, {
                            body: bodyify(body, ((response.headers) ? response.headers["content-type"] : null)),
                            error: error,
                            requestBody: bodyify(options.body, flatHeaders["content-type"]),
                            requestMethod: options.method,
                            url: url
                        });
                    }
                }
                runningTimeout.cancel();
                // If we had a processFunc, it eitehr returned a T or threw above.
                // The "body" is now a Uint8Array.
                return body;
            }
            return logger.throwError("failed response", Logger.errors.SERVER_ERROR, {
                requestBody: bodyify(options.body, flatHeaders["content-type"]),
                requestMethod: options.method,
                url: url
            });
        });
    })();
    return Promise.race([runningTimeout.promise, runningFetch]);
}
export function fetchJson(connection, json, processFunc) {
    let processJsonFunc = (value, response) => {
        let result = null;
        if (value != null) {
            try {
                result = JSON.parse(toUtf8String(value));
            }
            catch (error) {
                logger.throwError("invalid JSON", Logger.errors.SERVER_ERROR, {
                    body: value,
                    error: error
                });
            }
        }
        if (processFunc) {
            result = processFunc(result, response);
        }
        return result;
    };
    // If we have json to send, we must
    // - add content-type of application/json (unless already overridden)
    // - convert the json to bytes
    let body = null;
    if (json != null) {
        body = toUtf8Bytes(json);
        // Create a connection with the content-type set for JSON
        const updated = (typeof (connection) === "string") ? ({ url: connection }) : shallowCopy(connection);
        if (updated.headers) {
            const hasContentType = (Object.keys(updated.headers).filter((k) => (k.toLowerCase() === "content-type")).length) !== 0;
            if (!hasContentType) {
                updated.headers = shallowCopy(updated.headers);
                updated.headers["content-type"] = "application/json";
            }
        }
        else {
            updated.headers = { "content-type": "application/json" };
        }
        connection = updated;
    }
    return _fetchData(connection, body, processJsonFunc);
}
export function poll(func, options) {
    if (!options) {
        options = {};
    }
    options = shallowCopy(options);
    if (options.floor == null) {
        options.floor = 0;
    }
    if (options.ceiling == null) {
        options.ceiling = 10000;
    }
    if (options.interval == null) {
        options.interval = 250;
    }
    return new Promise(function (resolve, reject) {
        let timer = null;
        let done = false;
        // Returns true if cancel was successful. Unsuccessful cancel means we're already done.
        const cancel = () => {
            if (done) {
                return false;
            }
            done = true;
            if (timer) {
                clearTimeout(timer);
            }
            return true;
        };
        if (options.timeout) {
            timer = setTimeout(() => {
                if (cancel()) {
                    reject(new Error("timeout"));
                }
            }, options.timeout);
        }
        const retryLimit = options.retryLimit;
        let attempt = 0;
        function check() {
            return func().then(function (result) {
                // If we have a result, or are allowed null then we're done
                if (result !== undefined) {
                    if (cancel()) {
                        resolve(result);
                    }
                }
                else if (options.oncePoll) {
                    options.oncePoll.once("poll", check);
                }
                else if (options.onceBlock) {
                    options.onceBlock.once("block", check);
                    // Otherwise, exponential back-off (up to 10s) our next request
                }
                else if (!done) {
                    attempt++;
                    if (attempt > retryLimit) {
                        if (cancel()) {
                            reject(new Error("retry limit reached"));
                        }
                        return;
                    }
                    let timeout = options.interval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                    if (timeout < options.floor) {
                        timeout = options.floor;
                    }
                    if (timeout > options.ceiling) {
                        timeout = options.ceiling;
                    }
                    setTimeout(check, timeout);
                }
                return null;
            }, function (error) {
                if (cancel()) {
                    reject(error);
                }
            });
        }
        check();
    });
}
//# sourceMappingURL=index.js.map