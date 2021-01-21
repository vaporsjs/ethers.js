/// <reference types="node" />
import EventEmitter from "events";
import { vapors } from "vapors";
export declare class _Eip1193Bridge extends EventEmitter {
    readonly signer: vapors.Signer;
    readonly provider: vapors.providers.Provider;
    constructor(signer: vapors.Signer, provider?: vapors.providers.Provider);
    send(method: string, params?: Array<any>): Promise<any>;
}
