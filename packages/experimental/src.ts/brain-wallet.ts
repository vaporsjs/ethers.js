"use strict";

import { vapors } from "vapors";

import scrypt from "scrypt-js";

import { version } from "./_version";

const logger = new vapors.utils.Logger(version);

let warned = false;

export class BrainWallet extends vapors.Wallet {

    static _generate(username: vapors.Bytes | string, password: vapors.Bytes | string, legacy: boolean, progressCallback?: vapors.utils.ProgressCallback): Promise<BrainWallet> {
        if (!warned) {
            logger.warn("Warning: using Brain Wallets should be considered insecure (this warning will not be repeated)");
            warned = true;
        }
        let usernameBytes: Uint8Array = null;
        let passwordBytes: Uint8Array = null;

        if (typeof(username) === 'string') {
            logger.checkNormalize();
            usernameBytes = vapors.utils.toUtf8Bytes(username.normalize('NFKC'));
        } else {
            usernameBytes = vapors.utils.arrayify(username);
        }

        if (typeof(password) === 'string') {
            logger.checkNormalize();
            passwordBytes = vapors.utils.toUtf8Bytes(password.normalize('NFKC'));
        } else {
            passwordBytes = vapors.utils.arrayify(password);
        }

        return scrypt.scrypt(passwordBytes, usernameBytes, (1 << 18), 8, 1, 32, progressCallback).then((key: Uint8Array) => {
            if (legacy) {
                return new BrainWallet(key);

            }
            const mnemonic = vapors.utils.entropyToMnemonic(vapors.utils.arrayify(key).slice(0, 16));
            return new BrainWallet(vapors.Wallet.fromMnemonic(mnemonic));
        });
    }

    static generate(username: vapors.Bytes | string, password: vapors.Bytes | string, progressCallback?: vapors.utils.ProgressCallback): Promise<BrainWallet> {
        return BrainWallet._generate(username, password, false, progressCallback);
    }

    static generateLegacy(username: vapors.Bytes | string, password: vapors.Bytes | string, progressCallback?: vapors.utils.ProgressCallback): Promise<BrainWallet> {
        return BrainWallet._generate(username, password, true, progressCallback);
    }
}

/*
// Test Legacy correctly matches our old test-vector:
// See: https://github.com/vaporsjs/vapors.js/blob/3bf39b3bee0834566243211783ed8ec052c2f950/tests/test-wallet.js#L13
BrainWallet.generateLegacy("ricmoo", "password").then((wallet) => {
    console.log("Expected:", "0xbed9d2E41BdD066f702C4bDB86eB3A3740101acC");
    console.log(wallet);
});


BrainWallet.generate("ricmoo", "password").then((wallet) => {
    console.log("Expected:", "0xbed9d2E41BdD066f702C4bDB86eB3A3740101acC");
    console.log(wallet);
});
*/
