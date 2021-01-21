"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vapors_1 = require("vapors");
var _version_1 = require("./_version");
var logger = new vapors_1.vapors.utils.Logger(_version_1.version);
var MetamaskProvider = /** @class */ (function (_super) {
    __extends(MetamaskProvider, _super);
    function MetamaskProvider(vapory) {
        var _this = this;
        if (!vapory) {
            vapory = global.vapory;
            if (!vapory) {
                logger.throwError("could not auto-detect global.vapory", vapors_1.vapors.errors.UNSUPPORTED_OPERATION, {
                    operation: "window.vapory"
                });
            }
        }
        _this = _super.call(this, vapory) || this;
        var _account = null;
        vapors_1.vapors.utils.defineReadOnly(_this, "_pollAccountFunc", function () {
            var account = null;
            if (account === _account) {
                return;
            }
            console.log("poll");
            _this.emit("account", account, _account);
            _account = account;
        });
        _this = _super.call(this, vapory) || this;
        return _this;
    }
    MetamaskProvider.prototype.getSigner = function (addressOrIndex) {
        if (!this.enabled) {
            return null;
        }
        return _super.prototype.getSigner.call(this, addressOrIndex);
    };
    Object.defineProperty(MetamaskProvider.prototype, "enabled", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    MetamaskProvider.prototype._startPollingAccount = function () {
        if (this._pollingAccount) {
            return;
        }
        console.log("start polling for account changes including to/from null");
        this._pollingAccount = setInterval(this._pollAccountFunc, 1000);
    };
    MetamaskProvider.prototype._stopPollingAccount = function () {
        if (!this._pollingAccount) {
            return;
        }
        console.log("stop polling for account changes including to/from null");
        clearInterval(this._pollingAccount);
        this._pollingAccount = null;
    };
    MetamaskProvider.prototype.on = function (eventName, listener) {
        _super.prototype.on.call(this, eventName, listener);
        if (this.listenerCount("account") > 0) {
            this._startPollingAccount();
        }
        return this;
    };
    MetamaskProvider.prototype.off = function (eventName, listener) {
        _super.prototype.off.call(this, eventName, listener);
        if (this.listenerCount("account") === 0) {
            this._stopPollingAccount();
        }
        return this;
    };
    return MetamaskProvider;
}(vapors_1.vapors.providers.Web3Provider));
exports.MetamaskProvider = MetamaskProvider;
//# sourceMappingURL=metamask-provider.js.map