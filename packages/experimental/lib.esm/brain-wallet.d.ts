import { vapors } from "vapors";
export declare class BrainWallet extends vapors.Wallet {
    static _generate(username: vapors.Bytes | string, password: vapors.Bytes | string, legacy: boolean, progressCallback?: vapors.utils.ProgressCallback): Promise<BrainWallet>;
    static generate(username: vapors.Bytes | string, password: vapors.Bytes | string, progressCallback?: vapors.utils.ProgressCallback): Promise<BrainWallet>;
    static generateLegacy(username: vapors.Bytes | string, password: vapors.Bytes | string, progressCallback?: vapors.utils.ProgressCallback): Promise<BrainWallet>;
}
