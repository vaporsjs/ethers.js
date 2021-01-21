"use strict";
// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js
import * as vapors from "./vapors";
try {
    const anyGlobal = window;
    if (anyGlobal._vapors == null) {
        anyGlobal._vapors = vapors;
    }
}
catch (error) { }
export { vapors };
export { Signer, Wallet, VoidSigner, getDefaultProvider, providers, Contract, ContractFactory, BigNumber, FixedNumber, constants, errors, logger, utils, wordlists, 
////////////////////////
// Compile-Time Constants
version, Wordlist } from "./vapors";
//# sourceMappingURL=index.js.map