import { vapors } from "vapors";
export declare class NonceManager extends vapors.Signer {
    readonly signer: vapors.Signer;
    _initialPromise: Promise<number>;
    _deltaCount: number;
    constructor(signer: vapors.Signer);
    get provider(): vapors.providers.Provider;
    connect(provider: vapors.providers.Provider): NonceManager;
    getAddress(): Promise<string>;
    getTransactionCount(blockTag?: vapors.providers.BlockTag): Promise<number>;
    setTransactionCount(transactionCount: vapors.BigNumberish | Promise<vapors.BigNumberish>): void;
    incrementTransactionCount(count?: number): void;
    signMessage(message: vapors.Bytes | string): Promise<string>;
    signTransaction(transaction: vapors.utils.Deferrable<vapors.providers.TransactionRequest>): Promise<string>;
    sendTransaction(transaction: vapors.utils.Deferrable<vapors.providers.TransactionRequest>): Promise<vapors.providers.TransactionResponse>;
}
