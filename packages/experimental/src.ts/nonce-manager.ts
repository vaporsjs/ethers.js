"use strict"

import { vapors } from "vapors";

import { version } from "./_version";

const logger = new vapors.utils.Logger(version);

// @TODO: Keep a per-NonceManager pool of sent but unmined transactions for
//        rebroadcasting, in case we overrun the transaction pool

export class NonceManager extends vapors.Signer {
    readonly signer: vapors.Signer;

    _initialPromise: Promise<number>;
    _deltaCount: number;

    constructor(signer: vapors.Signer) {
        logger.checkNew(new.target, NonceManager);
        super();
        this._deltaCount = 0;
        vapors.utils.defineReadOnly(this, "signer", signer);
    }

    get provider(): vapors.providers.Provider {
        return this.signer.provider;
    }

    connect(provider: vapors.providers.Provider): NonceManager {
        return new NonceManager(this.signer.connect(provider));
    }

    getAddress(): Promise<string> {
        return this.signer.getAddress();
    }

    getTransactionCount(blockTag?: vapors.providers.BlockTag): Promise<number> {
        if (blockTag === "pending") {
            if (!this._initialPromise) {
                this._initialPromise = this.signer.getTransactionCount("pending");
            }
            const deltaCount = this._deltaCount;
            return this._initialPromise.then((initial) => (initial + deltaCount));
        }

        return this.signer.getTransactionCount(blockTag);
    }

    setTransactionCount(transactionCount: vapors.BigNumberish | Promise<vapors.BigNumberish>): void {
        this._initialPromise = Promise.resolve(transactionCount).then((nonce) => {
            return vapors.BigNumber.from(nonce).toNumber();
        });
        this._deltaCount = 0;
    }

    incrementTransactionCount(count?: number): void {
        this._deltaCount += (count ? count: 1);
    }

    signMessage(message: vapors.Bytes | string): Promise<string> {
        return this.signer.signMessage(message);;
    }

    signTransaction(transaction: vapors.utils.Deferrable<vapors.providers.TransactionRequest>): Promise<string> {
        return this.signer.signTransaction(transaction);
    }

    sendTransaction(transaction: vapors.utils.Deferrable<vapors.providers.TransactionRequest>): Promise<vapors.providers.TransactionResponse> {
        if (transaction.nonce == null) {
            transaction = vapors.utils.shallowCopy(transaction);
            transaction.nonce = this.getTransactionCount("pending");
            this.incrementTransactionCount();
        } else {
            this.setTransactionCount(transaction.nonce);
        }

        return this.signer.sendTransaction(transaction).then((tx) => {
            return tx;
        });
    }
}
