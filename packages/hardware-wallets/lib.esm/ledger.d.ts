import { vapors } from "vapors";
import Vap from "@ledgerhq/hw-app-vap";
export declare class LedgerSigner extends vapors.Signer {
    readonly type: string;
    readonly path: string;
    readonly _vap: Promise<Vap>;
    constructor(provider?: vapors.providers.Provider, type?: string, path?: string);
    _retry<T = any>(callback: (vap: Vap) => Promise<T>, timeout?: number): Promise<T>;
    getAddress(): Promise<string>;
    signMessage(message: vapors.utils.Bytes | string): Promise<string>;
    signTransaction(transaction: vapors.providers.TransactionRequest): Promise<string>;
    connect(provider: vapors.providers.Provider): vapors.Signer;
}
