"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_1 = require("@vaporsproject/bignumber");
var logger_1 = require("@vaporsproject/logger");
var _version_1 = require("./_version");
var logger = new logger_1.Logger(_version_1.version);
var names = [
    "wei",
    "kwei",
    "mwei",
    "gwei",
    "szabo",
    "finney",
    "vapor",
];
// Some environments have issues with RegEx that contain back-tracking, so we cannot
// use them.
function commify(value) {
    var comps = String(value).split(".");
    if (comps.length > 2 || !comps[0].match(/^-?[0-9]*$/) || (comps[1] && !comps[1].match(/^[0-9]*$/)) || value === "." || value === "-.") {
        logger.throwArgumentError("invalid value", "value", value);
    }
    // Make sure we have at least one whole digit (0 if none)
    var whole = comps[0];
    var negative = "";
    if (whole.substring(0, 1) === "-") {
        negative = "-";
        whole = whole.substring(1);
    }
    // Make sure we have at least 1 whole digit with no leading zeros
    while (whole.substring(0, 1) === "0") {
        whole = whole.substring(1);
    }
    if (whole === "") {
        whole = "0";
    }
    var suffix = "";
    if (comps.length === 2) {
        suffix = "." + (comps[1] || "0");
    }
    while (suffix.length > 2 && suffix[suffix.length - 1] === "0") {
        suffix = suffix.substring(0, suffix.length - 1);
    }
    var formatted = [];
    while (whole.length) {
        if (whole.length <= 3) {
            formatted.unshift(whole);
            break;
        }
        else {
            var index = whole.length - 3;
            formatted.unshift(whole.substring(index));
            whole = whole.substring(0, index);
        }
    }
    return negative + formatted.join(",") + suffix;
}
exports.commify = commify;
function formatUnits(value, unitName) {
    if (typeof (unitName) === "string") {
        var index = names.indexOf(unitName);
        if (index !== -1) {
            unitName = 3 * index;
        }
    }
    return bignumber_1.formatFixed(value, (unitName != null) ? unitName : 18);
}
exports.formatUnits = formatUnits;
function parseUnits(value, unitName) {
    if (typeof (value) !== "string") {
        logger.throwArgumentError("value must be a string", "value", value);
    }
    if (typeof (unitName) === "string") {
        var index = names.indexOf(unitName);
        if (index !== -1) {
            unitName = 3 * index;
        }
    }
    return bignumber_1.parseFixed(value, (unitName != null) ? unitName : 18);
}
exports.parseUnits = parseUnits;
function formatVapor(wei) {
    return formatUnits(wei, 18);
}
exports.formatVapor = formatVapor;
function parseVapor(vapor) {
    return parseUnits(vapor, 18);
}
exports.parseVapor = parseVapor;
//# sourceMappingURL=index.js.map