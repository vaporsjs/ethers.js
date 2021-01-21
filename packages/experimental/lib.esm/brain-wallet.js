"use strict";
import { vapors } from "vapors";
import scrypt from "scrypt-js";
import { version } from "./_version";
const logger = new vapors.utils.Logger(version);
let warned = false;
export class BrainWallet extends vapors.Wallet {
    static _generate(username, password, legacy, progressCallback) {
        if (!warned) {
            logger.warn("Warning: using Brain Wallets should be considered insecure (this warning will not be repeated)");
            warned = true;
        }
        let usernameBytes = null;
        let passwordBytes = null;
        if (typeof (username) === 'string') {
            logger.checkNormalize();
            usernameBytes = vapors.utils.toUtf8Bytes(username.normalize('NFKC'));
        }
        else {
            usernameBytes = vapors.utils.arrayify(username);
        }
        if (typeof (password) === 'string') {
            logger.checkNormalize();
            passwordBytes = vapors.utils.toUtf8Bytes(password.normalize('NFKC'));
        }
        else {
            passwordBytes = vapors.utils.arrayify(password);
        }
        return scrypt.scrypt(passwordBytes, usernameBytes, (1 << 18), 8, 1, 32, progressCallback).then((key) => {
            if (legacy) {
                return new BrainWallet(key);
            }
            const mnemonic = vapors.utils.entropyToMnemonic(vapors.utils.arrayify(key).slice(0, 16));
            return new BrainWallet(vapors.Wallet.fromMnemonic(mnemonic));
        });
    }
    static generate(username, password, progressCallback) {
        return BrainWallet._generate(username, password, false, progressCallback);
    }
    static generateLegacy(username, password, progressCallback) {
        return BrainWallet._generate(username, password, true, progressCallback);
    }
}
//# sourceMappingURL=brain-wallet.js.map