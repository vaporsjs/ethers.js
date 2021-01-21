"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js
var vapors = __importStar(require("./vapors"));
exports.vapors = vapors;
try {
    var anyGlobal = window;
    if (anyGlobal._vapors == null) {
        anyGlobal._vapors = vapors;
    }
}
catch (error) { }
var vapors_1 = require("./vapors");
exports.Signer = vapors_1.Signer;
exports.Wallet = vapors_1.Wallet;
exports.VoidSigner = vapors_1.VoidSigner;
exports.getDefaultProvider = vapors_1.getDefaultProvider;
exports.providers = vapors_1.providers;
exports.Contract = vapors_1.Contract;
exports.ContractFactory = vapors_1.ContractFactory;
exports.BigNumber = vapors_1.BigNumber;
exports.FixedNumber = vapors_1.FixedNumber;
exports.constants = vapors_1.constants;
exports.errors = vapors_1.errors;
exports.logger = vapors_1.logger;
exports.utils = vapors_1.utils;
exports.wordlists = vapors_1.wordlists;
////////////////////////
// Compile-Time Constants
exports.version = vapors_1.version;
exports.Wordlist = vapors_1.Wordlist;
//# sourceMappingURL=index.js.map