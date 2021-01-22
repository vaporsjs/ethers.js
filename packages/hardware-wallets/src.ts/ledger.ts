"use strict";

import { vapors } from "vapors";

import { version } from "./_version";
const logger = new vapors.utils.Logger(version);

import Vap from "hw-app-vap";

// We store these in a separated import so it is easier to swap them out
// at bundle time; browsers do not get HID, for example. This maps a string
// "type" to a Transport with create.
import { transports } from "./ledger-transport";

const defaultPath = "m/44'/60'/0'/0/0";

function waiter(duration: number): Promise<void> {
   return new Promise((resolve) => {
       setTimeout(resolve, duration);
   });
}

export class LedgerSigner extends vapors.Signer {
    readonly type: string;
    readonly path: string

    readonly _vap: Promise<Vap>;

    constructor(provider?: vapors.providers.Provider, type?: string, path?: string) {
        super();
        if (path == null) { path = defaultPath; }
        if (type == null) { type = "default"; }

        vapors.utils.defineReadOnly(this, "path", path);
        vapors.utils.defineReadOnly(this, "type", type);
        vapors.utils.defineReadOnly(this, "provider", provider || null);

        const transport = transports[type];
        if (!transport) { logger.throwArgumentError("unknown or unsupported type", "type", type); }

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

    _retry<T = any>(callback: (vap: Vap) => Promise<T>, timeout?: number): Promise<T> {
        return new Promise(async (resolve, reject) => {
            if (timeout && timeout > 0) {
                setTimeout(() => { reject(new Error("timeout")); }, timeout);
            }

            const vap = await this._vap;

            // Wait up to 5 seconds
            for (let i = 0; i < 50; i++) {
                try {
                    const result = await callback(vap);
                    return resolve(result);
                } catch (error) {
                    if (error.id !== "TransportLocked") {
                        return reject(error);
                    }
                }
                await waiter(100);
            }

            return reject(new Error("timeout"));
        });
    }

    async getAddress(): Promise<string> {
        const account = await this._retry((vap) => vap.getAddress(this.path));
        return vapors.utils.getAddress(account.address);
    }

    async signMessage(message: vapors.utils.Bytes | string): Promise<string> {
        if (typeof(message) === 'string') {
            message = vapors.utils.toUtf8Bytes(message);
        }

        const messageHex = vapors.utils.hexlify(message).substring(2);

        const sig = await this._retry((vap) => vap.signPersonalMessage(this.path, messageHex));
        sig.r = '0x' + sig.r;
        sig.s = '0x' + sig.s;
        return vapors.utils.joinSignature(sig);
    }

    async signTransaction(transaction: vapors.providers.TransactionRequest): Promise<string> {
        const tx = await vapors.utils.resolveProperties(transaction);
        const baseTx: vapors.utils.UnsignedTransaction = {
            chainId: (tx.chainId || undefined),
            data: (tx.data || undefined),
            gasLimit: (tx.gasLimit || undefined),
            gasPrice: (tx.gasPrice || undefined),
            nonce: (tx.nonce ? vapors.BigNumber.from(tx.nonce).toNumber(): undefined),
            to: (tx.to || undefined),
            value: (tx.value || undefined),
        };

        const unsignedTx = vapors.utils.serializeTransaction(baseTx).substring(2);
        const sig = await this._retry((vap) => vap.signTransaction(this.path, unsignedTx));

        return vapors.utils.serializeTransaction(baseTx, {
            v: vapors.BigNumber.from("0x" + sig.v).toNumber(),
            r: ("0x" + sig.r),
            s: ("0x" + sig.s),
        });
    }

    connect(provider: vapors.providers.Provider): vapors.Signer {
        return new LedgerSigner(provider, this.type, this.path);
    }
}
