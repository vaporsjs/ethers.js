"use strict";

import { vapors } from "vapors";

import { version } from "./_version";

const logger = new vapors.utils.Logger(version);

export class MetamaskProvider extends vapors.providers.Web3Provider {

    _pollingAccount: any;
    _pollAccountFunc: () => void;

    constructor(vapory?: vapors.providers.ExternalProvider) {
        if (!vapory) {
            vapory = (<any>global).vapory;
            if (!vapory) {
                logger.throwError("could not auto-detect global.vapory", vapors.errors.UNSUPPORTED_OPERATION, {
                    operation: "window.vapory"
                });
            }
        }

        super(vapory);

        let _account: string = null;
        vapors.utils.defineReadOnly(this, "_pollAccountFunc", () => {
            let account: string = null;
            if (account === _account) { return; }
            console.log("poll");
            this.emit("account", account, _account);
            _account = account;
        });

        super(vapory);
    }

    getSigner(addressOrIndex?: string | number): vapors.providers.JsonRpcSigner {
        if (!this.enabled) { return null }
        return super.getSigner(addressOrIndex);
    }

    get enabled(): boolean {
        return false;
    }

    _startPollingAccount(): void {
        if (this._pollingAccount) { return; }
        console.log("start polling for account changes including to/from null");
        this._pollingAccount = setInterval(this._pollAccountFunc, 1000);
    }

    _stopPollingAccount(): void {
        if (!this._pollingAccount) { return; }
        console.log("stop polling for account changes including to/from null");
        clearInterval(this._pollingAccount);
        this._pollingAccount = null;
    }

    on(eventName: vapors.providers.EventType, listener: vapors.providers.Listener): this {
        super.on(eventName, listener);
        if (this.listenerCount("account") > 0) {
            this._startPollingAccount();
        }
        return this;
    }

    off(eventName: vapors.providers.EventType, listener?: vapors.providers.Listener): this {
        super.off(eventName, listener);
        if (this.listenerCount("account") === 0) {
            this._stopPollingAccount();
        }
        return this;
    }

}
