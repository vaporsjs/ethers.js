import { vapors } from "vapors";
export declare class MetamaskProvider extends vapors.providers.Web3Provider {
    _pollingAccount: any;
    _pollAccountFunc: () => void;
    constructor(vapory?: vapors.providers.ExternalProvider);
    getSigner(addressOrIndex?: string | number): vapors.providers.JsonRpcSigner;
    get enabled(): boolean;
    _startPollingAccount(): void;
    _stopPollingAccount(): void;
    on(eventName: vapors.providers.EventType, listener: vapors.providers.Listener): this;
    off(eventName: vapors.providers.EventType, listener?: vapors.providers.Listener): this;
}
