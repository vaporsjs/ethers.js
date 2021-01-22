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
import { vapors } from "vapors";
import { version } from "./_version";
const logger = new vapors.utils.Logger(version);
import Vap from "hw-app-vap";
// We store these in a separated import so it is easier to swap them out
// at bundle time; browsers do not get HID, for example. This maps a string
// "type" to a Transport with create.
import { transports } from "./ledger-transport";
const defaultPath = "m/44'/60'/0'/0/0";
function waiter(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
export class LedgerSigner extends vapors.Signer {
    constructor(provider, type, path) {
        super();
        if (path == null) {
            path = defaultPath;
        }
        if (type == null) {
            type = "default";
        }
        vapors.utils.defineReadOnly(this, "path", path);
        vapors.utils.defineReadOnly(this, "type", type);
        vapors.utils.defineReadOnly(this, "provider", provider || null);
        const transport = transports[type];
        if (!transport) {
            logger.throwArgumentError("unknown or unsupported type", "type", type);
        }
        vapors.utils.defineReadOnly(this, "_vap", transport.create().then((transport) => {
            const vap = new Vap(transport);
            return vap.getAppConfiguration().then((config) => {
                return vap;
            }, (error) => {
                return Promise.reject(error);
            });
        }, (error) => {
            return Promise.reject(error);
        }));
    }
    _retry(callback, timeout) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (timeout && timeout > 0) {
                setTimeout(() => { reject(new Error("timeout")); }, timeout);
            }
            const vap = yield this._vap;
            // Wait up to 5 seconds
            for (let i = 0; i < 50; i++) {
                try {
                    const result = yield callback(vap);
                    return resolve(result);
                }
                catch (error) {
                    if (error.id !== "TransportLocked") {
                        return reject(error);
                    }
                }
                yield waiter(100);
            }
            return reject(new Error("timeout"));
        }));
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this._retry((vap) => vap.getAddress(this.path));
            return vapors.utils.getAddress(account.address);
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof (message) === 'string') {
                message = vapors.utils.toUtf8Bytes(message);
            }
            const messageHex = vapors.utils.hexlify(message).substring(2);
            const sig = yield this._retry((vap) => vap.signPersonalMessage(this.path, messageHex));
            sig.r = '0x' + sig.r;
            sig.s = '0x' + sig.s;
            return vapors.utils.joinSignature(sig);
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield vapors.utils.resolveProperties(transaction);
            const baseTx = {
                chainId: (tx.chainId || undefined),
                data: (tx.data || undefined),
                gasLimit: (tx.gasLimit || undefined),
                gasPrice: (tx.gasPrice || undefined),
                nonce: (tx.nonce ? vapors.BigNumber.from(tx.nonce).toNumber() : undefined),
                to: (tx.to || undefined),
                value: (tx.value || undefined),
            };
            const unsignedTx = vapors.utils.serializeTransaction(baseTx).substring(2);
            const sig = yield this._retry((vap) => vap.signTransaction(this.path, unsignedTx));
            return vapors.utils.serializeTransaction(baseTx, {
                v: vapors.BigNumber.from("0x" + sig.v).toNumber(),
                r: ("0x" + sig.r),
                s: ("0x" + sig.s),
            });
        });
    }
    connect(provider) {
        return new LedgerSigner(provider, this.type, this.path);
    }
}
//# sourceMappingURL=ledger.js.map