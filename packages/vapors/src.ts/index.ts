"use strict";

// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js

import * as vapors from "./vapors";

try {
    const anyGlobal = (window as any);

    if (anyGlobal._vapors == null) {
        anyGlobal._vapors = vapors;
    }
} catch (error) { }

export { vapors };

export {
    Signer,

    Wallet,
    VoidSigner,

    getDefaultProvider,
    providers,

    Contract,
    ContractFactory,

    BigNumber,
    FixedNumber,

    constants,
    errors,

    logger,

    utils,

    wordlists,


    ////////////////////////
    // Compile-Time Constants

    version,


    ////////////////////////
    // Types

    ContractFunction,
    ContractReceipt,
    ContractTransaction,
    Event,
    EventFilter,

    Overrides,
    PayableOverrides,
    CallOverrides,

    PopulatedTransaction,

    ContractInterface,

    BigNumberish,

    Bytes,
    BytesLike,

    Signature,

    Transaction,
    UnsignedTransaction,

    Wordlist
} from "./vapors";
