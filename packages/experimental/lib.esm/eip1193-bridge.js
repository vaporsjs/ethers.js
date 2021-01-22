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
import EventEmitter from "events";
import { vapors } from "vapors";
import { version } from "./_version";
const logger = new vapors.utils.Logger(version);
/*
function getBlockTag(tag) {
    if (tag == null) { return "latest"; }
    if (tag === "earliest" || tag === "latest" || tag === "pending") {
        return tag;
    }
    return vapors.utils.hexValue(tag)
}
*/
export class _Eip1193Bridge extends EventEmitter {
    constructor(signer, provider) {
        super();
        vapors.utils.defineReadOnly(this, "signer", signer);
        vapors.utils.defineReadOnly(this, "provider", provider || null);
    }
    send(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            function throwUnsupported(message) {
                return logger.throwError("vap_sign requires a signer", vapors.utils.Logger.errors.UNSUPPORTED_OPERATION, {
                    method: method,
                    params: params
                });
            }
            let coerce = (value) => value;
            switch (method) {
                case "vap_gasPrice": {
                    const result = yield this.provider.getGasPrice();
                    return result.toHexString();
                }
                case "vap_accounts": {
                    const result = [];
                    if (this.signer) {
                        const address = yield this.signer.getAddress();
                        result.push(address);
                    }
                    return result;
                }
                case "vap_blockNumber": {
                    return yield this.provider.getBlockNumber();
                }
                case "vap_chainId": {
                    const result = yield this.provider.getNetwork();
                    return result.chainId;
                }
                case "vap_getBalance": {
                    const result = yield this.provider.getBalance(params[0], params[1]);
                    return result.toHexString();
                }
                case "vap_getStorageAt": {
                    return this.provider.getStorageAt(params[0], params[1], params[2]);
                }
                case "vap_getTransactionCount": {
                    const result = yield this.provider.getTransactionCount(params[0], params[1]);
                    return vapors.utils.hexValue(result);
                }
                case "vap_getBlockTransactionCountByHash":
                case "vap_getBlockTransactionCountByNumber": {
                    const result = yield this.provider.getBlock(params[0]);
                    return vapors.utils.hexValue(result.transactions.length);
                }
                case "vap_getCode": {
                    const result = yield this.provider.getBlock(params[0]);
                    return result;
                }
                case "vap_sendRawTransaction": {
                    return yield this.provider.sendTransaction(params[0]);
                }
                case "vap_call": {
                    const req = vapors.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                    return yield this.provider.call(req, params[1]);
                }
                case "estimateGas": {
                    if (params[1] && params[1] !== "latest") {
                        throwUnsupported("estimateGas does not support blockTag");
                    }
                    const req = vapors.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                    const result = yield this.provider.estimateGas(req);
                    return result.toHexString();
                }
                // @TOOD: Transform? No uncles?
                case "vap_getBlockByHash":
                case "vap_getBlockByNumber": {
                    if (params[1]) {
                        return yield this.provider.getBlockWithTransactions(params[0]);
                    }
                    else {
                        return yield this.provider.getBlock(params[0]);
                    }
                }
                case "vap_getTransactionByHash": {
                    return yield this.provider.getTransaction(params[0]);
                }
                case "vap_getTransactionReceipt": {
                    return yield this.provider.getTransactionReceipt(params[0]);
                }
                case "vap_sign": {
                    if (!this.signer) {
                        return throwUnsupported("vap_sign requires an account");
                    }
                    const address = yield this.signer.getAddress();
                    if (address !== vapors.utils.getAddress(params[0])) {
                        logger.throwArgumentError("account mismatch or account not found", "params[0]", params[0]);
                    }
                    return this.signer.signMessage(vapors.utils.arrayify(params[1]));
                }
                case "vap_sendTransaction": {
                    if (!this.signer) {
                        return throwUnsupported("vap_sign requires an account");
                    }
                    const req = vapors.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                    const tx = yield this.signer.sendTransaction(req);
                    return tx.hash;
                }
                case "vap_getUncleCountByBlockHash":
                case "vap_getUncleCountByBlockNumber":
                    {
                        coerce = vapors.utils.hexValue;
                        break;
                    }
                case "vap_getTransactionByBlockHashAndIndex":
                case "vap_getTransactionByBlockNumberAndIndex":
                case "vap_getUncleByBlockHashAndIndex":
                case "vap_getUncleByBlockNumberAndIndex":
                case "vap_newFilter":
                case "vap_newBlockFilter":
                case "vap_newPendingTransactionFilter":
                case "vap_uninstallFilter":
                case "vap_getFilterChanges":
                case "vap_getFilterLogs":
                case "vap_getLogs":
                    break;
            }
            // If our provider supports send, maybe it can do a better job?
            if ((this.provider).send) {
                const result = yield (this.provider).send(method, params);
                return coerce(result);
            }
            return throwUnsupported(`unsupported method: ${method}`);
        });
    }
}
//# sourceMappingURL=eip1193-bridge.js.map