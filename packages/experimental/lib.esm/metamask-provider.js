"use strict";
import { vapors } from "vapors";
import { version } from "./_version";
const logger = new vapors.utils.Logger(version);
export class MetamaskProvider extends vapors.providers.Web3Provider {
    constructor(vapory) {
        if (!vapory) {
            vapory = global.vapory;
            if (!vapory) {
                logger.throwError("could not auto-detect global.vapory", vapors.errors.UNSUPPORTED_OPERATION, {
                    operation: "window.vapory"
                });
            }
        }
        super(vapory);
        let _account = null;
        vapors.utils.defineReadOnly(this, "_pollAccountFunc", () => {
            let account = null;
            if (account === _account) {
                return;
            }
            console.log("poll");
            this.emit("account", account, _account);
            _account = account;
        });
        super(vapory);
    }
    getSigner(addressOrIndex) {
        if (!this.enabled) {
            return null;
        }
        return super.getSigner(addressOrIndex);
    }
    get enabled() {
        return false;
    }
    _startPollingAccount() {
        if (this._pollingAccount) {
            return;
        }
        console.log("start polling for account changes including to/from null");
        this._pollingAccount = setInterval(this._pollAccountFunc, 1000);
    }
    _stopPollingAccount() {
        if (!this._pollingAccount) {
            return;
        }
        console.log("stop polling for account changes including to/from null");
        clearInterval(this._pollingAccount);
        this._pollingAccount = null;
    }
    on(eventName, listener) {
        super.on(eventName, listener);
        if (this.listenerCount("account") > 0) {
            this._startPollingAccount();
        }
        return this;
    }
    off(eventName, listener) {
        super.off(eventName, listener);
        if (this.listenerCount("account") === 0) {
            this._stopPollingAccount();
        }
        return this;
    }
}
//# sourceMappingURL=metamask-provider.js.map