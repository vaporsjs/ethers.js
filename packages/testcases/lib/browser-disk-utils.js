'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tiny_inflate_1 = __importDefault(require("tiny-inflate"));
var vapors_1 = require("vapors");
// This file is populated by the rollup-pre-alias.config.js
var browser_data_json_1 = __importDefault(require("./browser-data.json"));
function saveTests(tag, data) {
    throw new Error("browser does not support writing testcases");
}
exports.saveTests = saveTests;
var Cache = {};
function loadTests(tag) {
    var filename = 'testcases/' + tag + ".json.gz";
    if (Cache[filename] == null) {
        console.log("Loading Test Case: " + filename);
        try {
            var fileData = browser_data_json_1.default[filename];
            var comps = fileData.split(",");
            var size = parseInt(comps[0]), compressedData = vapors_1.vapors.utils.base64.decode(comps[1]);
            var uncompressedData = new Uint8Array(size);
            tiny_inflate_1.default(compressedData, uncompressedData);
            Cache[filename] = JSON.parse(vapors_1.vapors.utils.toUtf8String(uncompressedData));
        }
        catch (error) {
            console.log("ERROR", error);
            throw error;
        }
    }
    return Cache[filename];
}
exports.loadTests = loadTests;
function loadData(filename) {
    // Strip any leading relative paths (e.g. "./foo" => "foo")
    filename = filename.replace(/^[^a-z0-9_]/i, "");
    console.log("Loading Data File: " + filename);
    //filename = path.join(filename);
    return vapors_1.vapors.utils.base64.decode(browser_data_json_1.default[filename]);
}
exports.loadData = loadData;
//# sourceMappingURL=browser-disk-utils.js.map