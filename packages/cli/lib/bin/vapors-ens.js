#!/usr/bin/env node
'use strict';
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vapors_1 = require("vapors");
var basex_1 = require("@vaporsproject/basex");
var cli_1 = require("../cli");
var _version_1 = require("../_version");
var logger = new vapors_1.vapors.utils.Logger(_version_1.version);
var vnsAbi = [
    "function setOwner(bytes32 node, address owner) external @500000",
    "function setSubnodeOwner(bytes32 node, bytes32 label, address owner) external @500000",
    "function setResolver(bytes32 node, address resolver) external @500000",
    "function owner(bytes32 node) external view returns (address)",
    "function resolver(bytes32 node) external view returns (address)"
];
var States = Object.freeze(["Open", "Auction", "Owned", "Forbidden", "Reveal", "NotAvailable"]);
var deedAbi = [
    "function owner() view returns (address)"
];
var vapLegacyRegistrarAbi = [
    "function entries(bytes32 _hash) view returns (uint8 state, address owner, uint registrationDate, uint value, uint highestBid)",
    "function transferRegistrars(bytes32 _hash) @500000",
];
var vapControllerAbi = [
    "function rentPrice(string memory name, uint duration) view public returns(uint)",
    "function available(string memory label) public view returns(bool)",
    "function makeCommitment(string memory name, address owner, bytes32 secret) pure public returns(bytes32)",
    "function commit(bytes32 commitment) public @500000",
    "function register(string calldata name, address owner, uint duration, bytes32 secret) payable @500000",
    "function renew(string calldata name, uint duration) payable @500000",
];
var vapRegistrarAbi = [
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function reclaim(uint256 id, address owner) @500000",
    "function safeTransferFrom(address from, address to, uint256 tokenId) @500000",
    "function nameExpires(uint256 id) external view returns(uint)"
];
var resolverAbi = [
    "function interfaceImplementer(bytes32 nodehash, bytes4 interfaceId) view returns (address)",
    "function addr(bytes32 nodehash) view returns (address)",
    "function setAddr(bytes32 nodehash, address addr) @500000",
    "function name(bytes32 nodehash) view returns (string)",
    "function setName(bytes32 nodehash, string name) @500000",
    "function text(bytes32 nodehash, string key) view returns (string)",
    "function setText(bytes32 nodehash, string key, string value) @500000",
    "function contenthash(bytes32 nodehash) view returns (bytes)",
    "function setContenthash(bytes32 nodehash, bytes contenthash) @500000",
];
//const InterfaceID_ERC721      = "0x6ccb2df4";
var InterfaceID_Controller = "0x018fac06";
var InterfaceID_Legacy = "0x7ba18ba1";
/*

const reverseRegistrarAbi = [
];
*/
function listify(words) {
    if (words.length === 1) {
        return words[0];
    }
    return words.slice(0, words.length - 1).join(", ") + " and " + words[words.length - 1];
}
var cli = new cli_1.CLI();
var EnsPlugin = /** @class */ (function (_super) {
    __extends(EnsPlugin, _super);
    function EnsPlugin() {
        var _this = _super.call(this) || this;
        vapors_1.vapors.utils.defineReadOnly(_this, "_vapAddressCache", {});
        return _this;
    }
    EnsPlugin.prototype.getEns = function () {
        return new vapors_1.vapors.Contract(this.network.vnsAddress, vnsAbi, this.accounts[0] || this.provider);
    };
    EnsPlugin.prototype.getResolver = function (nodehash) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this._vapAddressCache[nodehash]) return [3 /*break*/, 2];
                        _a = this._vapAddressCache;
                        _b = nodehash;
                        return [4 /*yield*/, this.getEns().resolver(nodehash)];
                    case 1:
                        _a[_b] = _c.sent();
                        _c.label = 2;
                    case 2: return [2 /*return*/, new vapors_1.vapors.Contract(this._vapAddressCache[nodehash], resolverAbi, this.accounts[0] || this.provider)];
                }
            });
        });
    };
    EnsPlugin.prototype.getVapInterfaceAddress = function (interfaceId) {
        return __awaiter(this, void 0, void 0, function () {
            var vapNodehash, resolver, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        vapNodehash = vapors_1.vapors.utils.namehash("vap");
                        if (!!this._vapAddressCache[interfaceId]) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getResolver(vapNodehash)];
                    case 1:
                        resolver = _c.sent();
                        _a = this._vapAddressCache;
                        _b = interfaceId;
                        return [4 /*yield*/, resolver.interfaceImplementer(vapNodehash, interfaceId)];
                    case 2:
                        _a[_b] = _c.sent();
                        _c.label = 3;
                    case 3: return [2 /*return*/, this._vapAddressCache[interfaceId]];
                }
            });
        });
    };
    EnsPlugin.prototype.getVapController = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVapInterfaceAddress(InterfaceID_Controller)];
                    case 1:
                        address = _a.sent();
                        return [2 /*return*/, new vapors_1.vapors.Contract(address, vapControllerAbi, this.accounts[0] || this.provider)];
                }
            });
        });
    };
    EnsPlugin.prototype.getVapLegacyRegistrar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVapInterfaceAddress(InterfaceID_Legacy)];
                    case 1:
                        address = _a.sent();
                        return [2 /*return*/, new vapors_1.vapors.Contract(address, vapLegacyRegistrarAbi, this.accounts[0] || this.provider)];
                }
            });
        });
    };
    EnsPlugin.prototype.getVapRegistrar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getEns().owner(vapors_1.vapors.utils.namehash("vap"))];
                    case 1:
                        address = _a.sent();
                        return [2 /*return*/, new vapors_1.vapors.Contract(address, vapRegistrarAbi, this.accounts[0] || this.provider)];
                }
            });
        });
    };
    return EnsPlugin;
}(cli_1.Plugin));
var LookupPlugin = /** @class */ (function (_super) {
    __extends(LookupPlugin, _super);
    function LookupPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LookupPlugin.getHelp = function () {
        return {
            name: "lookup [ NAME | ADDRESS [ ... ] ]",
            help: "Lookup a name or address"
        };
    };
    LookupPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        this.names = args;
                        return [2 /*return*/];
                }
            });
        });
    };
    LookupPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vns, controller, registrar, legacyRegistrar, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        vns = this.getEns();
                        return [4 /*yield*/, this.getVapController()];
                    case 2:
                        controller = _a.sent();
                        return [4 /*yield*/, this.getVapRegistrar()];
                    case 3:
                        registrar = _a.sent();
                        return [4 /*yield*/, this.getVapLegacyRegistrar()];
                    case 4:
                        legacyRegistrar = _a.sent();
                        _loop_1 = function (i) {
                            var name_1, nodehash, details, owner, resolverAddress, _a, comps, _b, ownerOf, error_1, entry, deed, _c, resolver, _d, _e, email, website, content, ordered, key;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        name_1 = this_1.names[i];
                                        nodehash = vapors_1.vapors.utils.namehash(name_1);
                                        details = {
                                            Nodehash: nodehash
                                        };
                                        return [4 /*yield*/, vns.owner(nodehash)];
                                    case 1:
                                        owner = _f.sent();
                                        resolverAddress = null;
                                        if (!(owner === vapors_1.vapors.constants.AddressZero)) return [3 /*break*/, 2];
                                        owner = null;
                                        return [3 /*break*/, 4];
                                    case 2:
                                        details.Controller = owner;
                                        _a = details;
                                        return [4 /*yield*/, vns.resolver(nodehash).then(function (address) {
                                                if (address === vapors_1.vapors.constants.AddressZero) {
                                                    return "(not configured)";
                                                }
                                                resolverAddress = address;
                                                return address;
                                            })];
                                    case 3:
                                        _a.Resolver = _f.sent();
                                        _f.label = 4;
                                    case 4:
                                        comps = name_1.split(".");
                                        if (!(comps.length === 2 && comps[1] === "vap")) return [3 /*break*/, 11];
                                        details.Labelhash = vapors_1.vapors.utils.id(comps[0].toLowerCase()); // @TODO: nameprep
                                        _b = details;
                                        return [4 /*yield*/, controller.available(comps[0])];
                                    case 5:
                                        _b.Available = _f.sent();
                                        if (!!details.Available) return [3 /*break*/, 11];
                                        _f.label = 6;
                                    case 6:
                                        _f.trys.push([6, 8, , 11]);
                                        return [4 /*yield*/, registrar.ownerOf(details.Labelhash)];
                                    case 7:
                                        ownerOf = _f.sent();
                                        if (ownerOf !== vapors_1.vapors.constants.AddressZero) {
                                            details.Registrant = ownerOf;
                                            details.Registrar = "Permanent";
                                        }
                                        return [3 /*break*/, 11];
                                    case 8:
                                        error_1 = _f.sent();
                                        return [4 /*yield*/, legacyRegistrar.entries(details.Labelhash)];
                                    case 9:
                                        entry = _f.sent();
                                        deed = new vapors_1.vapors.Contract(entry.owner, deedAbi, this_1.provider);
                                        _c = details;
                                        return [4 /*yield*/, deed.owner()];
                                    case 10:
                                        _c.Registrant = _f.sent();
                                        details.Registrar = "Legacy";
                                        details["Deed Value"] = (vapors_1.vapors.utils.formatVapor(entry.value) + " vapor");
                                        details["Highest Bid"] = (vapors_1.vapors.utils.formatVapor(entry.highestBid) + " vapor");
                                        return [3 /*break*/, 11];
                                    case 11:
                                        if (!resolverAddress) return [3 /*break*/, 16];
                                        resolver = new vapors_1.vapors.Contract(resolverAddress, resolverAbi, this_1.provider);
                                        _d = details;
                                        _e = "Address";
                                        return [4 /*yield*/, resolver.addr(nodehash)];
                                    case 12:
                                        _d[_e] = _f.sent();
                                        return [4 /*yield*/, resolver.text(nodehash, "email").catch(function (error) { return (""); })];
                                    case 13:
                                        email = _f.sent();
                                        if (email) {
                                            details["E-mail"] = email;
                                        }
                                        return [4 /*yield*/, resolver.text(nodehash, "url").catch(function (error) { return (""); })];
                                    case 14:
                                        website = _f.sent();
                                        if (website) {
                                            details["Website"] = website;
                                        }
                                        return [4 /*yield*/, resolver.contenthash(nodehash).then(function (hash) {
                                                if (hash === "0x") {
                                                    return "";
                                                }
                                                if (hash.substring(0, 10) === "0xe3010170" && vapors_1.vapors.utils.isHexString(hash, 38)) {
                                                    return basex_1.Base58.encode(vapors_1.vapors.utils.hexDataSlice(hash, 4)) + " (IPFS)";
                                                }
                                                return hash + " (unknown format)";
                                            }, function (error) { return (""); })];
                                    case 15:
                                        content = _f.sent();
                                        if (content) {
                                            details["Content Hash"] = content;
                                        }
                                        _f.label = 16;
                                    case 16:
                                        ordered = {};
                                        "Nodehash,Labelhash,Available,Registrant,Controller,Resolver,Address,Registrar,Deed Value,Highest Bid,E-mail,Website,Content Hash".split(",").forEach(function (key) {
                                            if (!details[key]) {
                                                return;
                                            }
                                            ordered[key] = details[key];
                                        });
                                        for (key in details) {
                                            if (ordered[key]) {
                                                continue;
                                            }
                                            ordered[key] = details[key];
                                        }
                                        this_1.dump("Name: " + this_1.names[i], ordered);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < this.names.length)) return [3 /*break*/, 8];
                        return [5 /*yield**/, _loop_1(i)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return LookupPlugin;
}(EnsPlugin));
cli.addPlugin("lookup", LookupPlugin);
var AccountPlugin = /** @class */ (function (_super) {
    __extends(AccountPlugin, _super);
    function AccountPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccountPlugin.getHelp = function () {
        return logger.throwError("subclasses must implement this", vapors_1.vapors.errors.UNSUPPORTED_OPERATION, {
            operation: "getHelp"
        });
    };
    AccountPlugin.prototype._setValue = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vapors_1.vapors.utils.defineReadOnly(this, key, value);
                        if (!(key === "name")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setValue("nodehash", vapors_1.vapors.utils.namehash(value))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AccountPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var helpLine, params, command, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        helpLine = vapors_1.vapors.utils.getStatic(this.constructor, "getHelp")().name;
                        params = helpLine.split(" ");
                        command = params[0];
                        params = params.slice(1);
                        if (this.accounts.length !== 1) {
                            this.throwError(command + " requires an account");
                        }
                        if (args.length !== params.length) {
                            this.throwError(command + " requires exactly " + listify(params));
                        }
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < params.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._setValue(params[i].toLowerCase(), args[i])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AccountPlugin;
}(EnsPlugin));
var ControllerPlugin = /** @class */ (function (_super) {
    __extends(ControllerPlugin, _super);
    function ControllerPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControllerPlugin.getOptionHelp = function () {
        return [
            {
                name: "[ --duration DAYS ]",
                help: "Register duration (default: 365 days)"
            },
            {
                name: "[ --salt SALT ]",
                help: "SALT to blind the commit with"
            },
            {
                name: "[ --secret SECRET ]",
                help: "Use id(SECRET) as the salt"
            },
            {
                name: "[ --owner OWNER ]",
                help: "The target owner (default: current account)"
            }
        ];
    };
    ControllerPlugin.prototype._setValue = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var comps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(key === "name")) return [3 /*break*/, 2];
                        comps = value.split(".");
                        if (comps.length !== 2 || comps[1] !== "vap") {
                            this.throwError("Invalid NAME");
                        }
                        return [4 /*yield*/, _super.prototype._setValue.call(this, "label", comps[0])];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, _super.prototype._setValue.call(this, key, value)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlugin.prototype.prepareOptions = function (argParser) {
        return __awaiter(this, void 0, void 0, function () {
            var secret, _a, _b, duration;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareOptions.call(this, argParser)];
                    case 1:
                        _c.sent();
                        this.salt = argParser.consumeOption("salt");
                        secret = argParser.consumeOption("secret");
                        if (secret) {
                            if (this.salt) {
                                this.throwError("Cannot specify --salt with --secret");
                            }
                            this.salt = vapors_1.vapors.utils.id(secret);
                        }
                        this.owner = argParser.consumeOption("owner");
                        if (!this.owner) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.getAddress(this.owner)];
                    case 2:
                        _a.owner = _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _b = this;
                        return [4 /*yield*/, this.accounts[0].getAddress()];
                    case 4:
                        _b.owner = _c.sent();
                        _c.label = 5;
                    case 5:
                        duration = parseInt(argParser.consumeOption("duration") || "365");
                        if (duration < 28) {
                            this.throwError("registration must be for a minimum length of 28 days");
                        }
                        vapors_1.vapors.utils.defineReadOnly(this, "duration", duration * (60 * 60 * 24));
                        return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        if (!!this.salt) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.accounts[0].signMessage("commit-" + this.owner + "-" + this.name)];
                    case 2:
                        signature = _a.sent();
                        this.salt = vapors_1.vapors.utils.keccak256(signature);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ControllerPlugin;
}(AccountPlugin));
var CommitPlugin = /** @class */ (function (_super) {
    __extends(CommitPlugin, _super);
    function CommitPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommitPlugin.getHelp = function () {
        return {
            name: "commit NAME",
            help: "Submit a pre-commitment"
        };
    };
    CommitPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vapController, commitment, fee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getVapController()];
                    case 2:
                        vapController = _a.sent();
                        return [4 /*yield*/, vapController.makeCommitment(this.label, this.owner, this.salt)];
                    case 3:
                        commitment = _a.sent();
                        return [4 /*yield*/, vapController.rentPrice(this.label, this.duration)];
                    case 4:
                        fee = _a.sent();
                        this.dump("Commit: " + this.name, {
                            Nodehash: this.nodehash,
                            Owner: this.owner,
                            Salt: this.salt,
                            Duration: (this.duration + " seconds (informational)"),
                            Fee: vapors_1.vapors.utils.formatVapor(fee) + " (informational)",
                            Commitment: commitment
                        });
                        return [4 /*yield*/, vapController.commit(commitment)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CommitPlugin;
}(ControllerPlugin));
cli.addPlugin("commit", CommitPlugin);
var RevealPlugin = /** @class */ (function (_super) {
    __extends(RevealPlugin, _super);
    function RevealPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RevealPlugin.getHelp = function () {
        return {
            name: "reveal NAME",
            help: "Reveal a previous pre-commitment"
        };
    };
    RevealPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vapController, fee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getVapController()];
                    case 2:
                        vapController = _a.sent();
                        return [4 /*yield*/, vapController.rentPrice(this.label, this.duration)];
                    case 3:
                        fee = _a.sent();
                        this.dump("Reveal: " + this.name, {
                            Nodehash: this.nodehash,
                            Owner: this.owner,
                            Salt: this.salt,
                            Duration: (this.duration + " seconds"),
                            Fee: vapors_1.vapors.utils.formatVapor(fee),
                        });
                        return [4 /*yield*/, vapController.register(this.label, this.owner, this.duration, this.salt, {
                                value: fee.mul(11).div(10)
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return RevealPlugin;
}(ControllerPlugin));
cli.addPlugin("reveal", RevealPlugin);
/*
class CommitRevealPlugin extends RevealPlugin {
    waitBlocks: number;

    static getHelp(): Help {
        return {
           name: "commit-reveal LABEL",
           help: "Commit, wait and reveal a name"
        }
    }

    static getOptionHelp(): Array<Help> {
        let help = CommitPlugin.getOptionHelp().slice();

        help.push({
            name: "[ --wait BLOCKS ]",
            help: "Wait BLOCKS confirms (Default: 5)"
        })

        return help;
    }

    async prepareOptions(argParser: ArgParser): Promise<void> {
        await super.prepareOptions(argParser);

        let waitBlocks = argParser.consumeOption("wait");
        try {
            this.waitBlocks = parseInt(waitBlocks || "5");
        } catch(error) {
            this.throwError("Invalid --wait BLOCKS")
        }
    }

    async run(): Promise<void> {
        await super.run();
        console.log(this);
    }
}
cli.addPlugin("commit-reveal", CommitRevealPlugin);
*/
var AddressAccountPlugin = /** @class */ (function (_super) {
    __extends(AddressAccountPlugin, _super);
    function AddressAccountPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddressAccountPlugin.getOptionHelp = function () {
        return [
            {
                name: "[ --address ADDRESS ]",
                help: "Specify another address"
            }
        ];
    };
    AddressAccountPlugin.prototype.getDefaultAddress = function () {
        return this.accounts[0].getAddress();
    };
    AddressAccountPlugin.prototype.prepareOptions = function (argParser) {
        return __awaiter(this, void 0, void 0, function () {
            var address, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareOptions.call(this, argParser)];
                    case 1:
                        _b.sent();
                        address = argParser.consumeOption("address");
                        if (!!address) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getDefaultAddress()];
                    case 2:
                        address = _b.sent();
                        _b.label = 3;
                    case 3:
                        _a = this;
                        return [4 /*yield*/, this.getAddress(address)];
                    case 4:
                        _a.address = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AddressAccountPlugin;
}(AccountPlugin));
var SetControllerPlugin = /** @class */ (function (_super) {
    __extends(SetControllerPlugin, _super);
    function SetControllerPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetControllerPlugin.getHelp = function () {
        return {
            name: "set-controller NAME",
            help: "Set the controller (default: current account)"
        };
    };
    SetControllerPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        this.dump("Set Subnode: " + this.name, {
                            "Nodehash": this.nodehash,
                            "Owner": this.address
                        });
                        this.getEns().setOwner(this.nodehash, this.address);
                        return [2 /*return*/];
                }
            });
        });
    };
    return SetControllerPlugin;
}(AddressAccountPlugin));
cli.addPlugin("set-controller", SetControllerPlugin);
var SetSubnodePlugin = /** @class */ (function (_super) {
    __extends(SetSubnodePlugin, _super);
    function SetSubnodePlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetSubnodePlugin.getHelp = function () {
        return {
            name: "set-subnode NAME",
            help: "Set a subnode owner (default: current account)"
        };
    };
    SetSubnodePlugin.prototype._setValue = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var comps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(key === "name")) return [3 /*break*/, 3];
                        comps = value.toLowerCase().split(".");
                        return [4 /*yield*/, _super.prototype._setValue.call(this, "label", comps[0])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, _super.prototype._setValue.call(this, "node", comps.slice(1).join("."))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, _super.prototype._setValue.call(this, key, value)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetSubnodePlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        this.dump("Set Subnode: " + this.name, {
                            "Label": this.label,
                            "Node": this.node,
                            "Owner": this.address
                        });
                        return [4 /*yield*/, this.getEns().setSubnodeOwner(vapors_1.vapors.utils.namehash(this.node), vapors_1.vapors.utils.id(this.label), this.address)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SetSubnodePlugin;
}(AddressAccountPlugin));
cli.addPlugin("set-subnode", SetSubnodePlugin);
var SetResolverPlugin = /** @class */ (function (_super) {
    __extends(SetResolverPlugin, _super);
    function SetResolverPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetResolverPlugin.getHelp = function () {
        return {
            name: "set-resolver NAME",
            help: "Set the resolver (default: resolver.vap)"
        };
    };
    SetResolverPlugin.prototype.getDefaultAddress = function () {
        return this.getAddress("resolver.vap");
    };
    SetResolverPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        this.dump("Set Resolver: " + this.name, {
                            "Nodehash": this.nodehash,
                            "Resolver": this.address
                        });
                        return [4 /*yield*/, this.getEns().setResolver(this.nodehash, this.address)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SetResolverPlugin;
}(AddressAccountPlugin));
cli.addPlugin("set-resolver", SetResolverPlugin);
var SetAddrPlugin = /** @class */ (function (_super) {
    __extends(SetAddrPlugin, _super);
    function SetAddrPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetAddrPlugin.getHelp = function () {
        return {
            name: "set-addr NAME",
            help: "Set the addr record (default: current account)"
        };
    };
    SetAddrPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resolver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        this.dump("Set Addr: " + this.name, {
                            "Nodehash": this.nodehash,
                            "Address": this.address
                        });
                        return [4 /*yield*/, this.getResolver(this.nodehash)];
                    case 2:
                        resolver = _a.sent();
                        return [4 /*yield*/, resolver.setAddr(this.nodehash, this.address)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SetAddrPlugin;
}(AddressAccountPlugin));
cli.addPlugin("set-addr", SetAddrPlugin);
var SetNamePlugin = /** @class */ (function (_super) {
    __extends(SetNamePlugin, _super);
    function SetNamePlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetNamePlugin.getHelp = function () {
        return {
            name: "set-name NAME",
            help: "Set the reverse name record (default: current account)"
        };
    };
    SetNamePlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nodehash, resolver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        nodehash = vapors_1.vapors.utils.namehash(this.address.substring(2) + ".addr.reverse");
                        this.dump("Set Name: " + this.name, {
                            "Nodehash": nodehash,
                            "Address": this.address
                        });
                        return [4 /*yield*/, this.getResolver(nodehash)];
                    case 2:
                        resolver = _a.sent();
                        return [4 /*yield*/, resolver.setName(nodehash, this.name)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SetNamePlugin;
}(AddressAccountPlugin));
cli.addPlugin("set-name", SetNamePlugin);
var TextAccountPlugin = /** @class */ (function (_super) {
    __extends(TextAccountPlugin, _super);
    function TextAccountPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAccountPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var key, value, resolver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        key = this.getKey();
                        value = this.getValue();
                        this.dump("Set " + this.getHeader() + ": " + this.name, {
                            Nodehash: this.nodehash,
                            Key: key,
                            Value: value
                        });
                        return [4 /*yield*/, this.getResolver(this.nodehash)];
                    case 2:
                        resolver = _a.sent();
                        return [4 /*yield*/, resolver.setText(this.nodehash, key, value)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TextAccountPlugin;
}(AccountPlugin));
var SetTextPlugin = /** @class */ (function (_super) {
    __extends(SetTextPlugin, _super);
    function SetTextPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetTextPlugin.getHelp = function () {
        return {
            name: "set-text NAME KEY VALUE",
            help: "Set a text record"
        };
    };
    SetTextPlugin.prototype.getHeader = function () { return "Test"; };
    SetTextPlugin.prototype.getKey = function () { return this.key; };
    SetTextPlugin.prototype.getValue = function () { return this.value; };
    return SetTextPlugin;
}(TextAccountPlugin));
cli.addPlugin("set-text", SetTextPlugin);
var SetEmailPlugin = /** @class */ (function (_super) {
    __extends(SetEmailPlugin, _super);
    function SetEmailPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetEmailPlugin.getHelp = function () {
        return {
            name: "set-email NAME EMAIL",
            help: "Set the email text record"
        };
    };
    SetEmailPlugin.prototype.getHeader = function () { return "E-mail"; };
    SetEmailPlugin.prototype.getKey = function () { return "email"; };
    SetEmailPlugin.prototype.getValue = function () { return this.email; };
    return SetEmailPlugin;
}(TextAccountPlugin));
cli.addPlugin("set-email", SetEmailPlugin);
var SetWebsitePlugin = /** @class */ (function (_super) {
    __extends(SetWebsitePlugin, _super);
    function SetWebsitePlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetWebsitePlugin.getHelp = function () {
        return {
            name: "set-website NAME URL",
            help: "Set the website text record"
        };
    };
    SetWebsitePlugin.prototype.getHeader = function () { return "Website"; };
    SetWebsitePlugin.prototype.getKey = function () { return "url"; };
    SetWebsitePlugin.prototype.getValue = function () { return this.url; };
    return SetWebsitePlugin;
}(TextAccountPlugin));
cli.addPlugin("set-website", SetWebsitePlugin);
var SetContentPlugin = /** @class */ (function (_super) {
    __extends(SetContentPlugin, _super);
    function SetContentPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetContentPlugin.getHelp = function () {
        return {
            name: "set-content NAME HASH",
            help: "Set the IPFS Content Hash"
        };
    };
    SetContentPlugin.prototype._setValue = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var bytes, multihash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(key === "hash")) return [3 /*break*/, 2];
                        bytes = basex_1.Base58.decode(value);
                        if (bytes.length !== 34 || bytes[0] !== 18 || bytes[1] !== 32) {
                            this.throwError("Unsupported IPFS hash");
                        }
                        multihash = vapors_1.vapors.utils.concat(["0xe3010170", bytes]);
                        return [4 /*yield*/, _super.prototype._setValue.call(this, "multihash", vapors_1.vapors.utils.hexlify(multihash))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, _super.prototype._setValue.call(this, key, value)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetContentPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resolver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        this.dump("Set Content Hash: " + this.name, {
                            Nodehash: this.nodehash,
                            "Content Hash": this.hash
                        });
                        return [4 /*yield*/, this.getResolver(this.nodehash)];
                    case 2:
                        resolver = _a.sent();
                        return [4 /*yield*/, resolver.setContenthash(this.nodehash, this.multihash)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SetContentPlugin;
}(AccountPlugin));
cli.addPlugin("set-content", SetContentPlugin);
var MigrateRegistrarPlugin = /** @class */ (function (_super) {
    __extends(MigrateRegistrarPlugin, _super);
    function MigrateRegistrarPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MigrateRegistrarPlugin.getHelp = function () {
        return {
            name: "migrate-registrar NAME",
            help: "Migrate from the Legacy to the Permanent Registrar"
        };
    };
    MigrateRegistrarPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var comps, vapLegacyRegistrar, entry, deed, owner, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        comps = this.name.split(".");
                        if (comps.length !== 2 || comps[1] !== "vap") {
                            this.throwError("Not a top-level .vap name");
                        }
                        return [4 /*yield*/, _super.prototype._setValue.call(this, "label", comps[0])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getVapLegacyRegistrar()];
                    case 3:
                        vapLegacyRegistrar = _a.sent();
                        return [4 /*yield*/, vapLegacyRegistrar.entries(vapors_1.vapors.utils.id(comps[0]))];
                    case 4:
                        entry = _a.sent();
                        // Only owned names can be migrated
                        if (States[entry.state] !== "Owned") {
                            this.throwError("Name not present in the Legacy registrar");
                        }
                        deed = new vapors_1.vapors.Contract(entry.owner, deedAbi, this.provider);
                        return [4 /*yield*/, deed.owner()];
                    case 5:
                        owner = _a.sent();
                        return [4 /*yield*/, this.accounts[0].getAddress()];
                    case 6:
                        address = _a.sent();
                        // Only the deed owner (registrant) may migrate a name
                        if (owner !== address) {
                            this.throwError("Only the registrant can migrate");
                        }
                        return [4 /*yield*/, _super.prototype._setValue.call(this, "deedValue", entry.value)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, _super.prototype._setValue.call(this, "highestBid", entry.highestBid)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MigrateRegistrarPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var legacyRegistrar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        this.dump("Migrate Registrar: " + this.name, {
                            "Nodehash": this.nodehash,
                            "Highest Bid": (vapors_1.vapors.utils.formatVapor(this.highestBid) + " vapor"),
                            "Deed Value": (vapors_1.vapors.utils.formatVapor(this.deedValue) + " vapor"),
                        });
                        return [4 /*yield*/, this.getVapLegacyRegistrar()];
                    case 2:
                        legacyRegistrar = _a.sent();
                        return [4 /*yield*/, legacyRegistrar.transferRegistrars(vapors_1.vapors.utils.id(this.label))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MigrateRegistrarPlugin;
}(AccountPlugin));
cli.addPlugin("migrate-registrar", MigrateRegistrarPlugin);
var TransferPlugin = /** @class */ (function (_super) {
    __extends(TransferPlugin, _super);
    function TransferPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransferPlugin.getHelp = function () {
        return {
            name: "transfer NAME NEW_OWNER",
            help: "Transfer registrant ownership"
        };
    };
    TransferPlugin.prototype._setValue = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var address, comps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(key === "new_owner")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getAddress(value)];
                    case 1:
                        address = _a.sent();
                        return [4 /*yield*/, _super.prototype._setValue.call(this, key, address)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 3:
                        if (!(key === "name")) return [3 /*break*/, 6];
                        comps = value.split(".");
                        if (comps.length !== 2 || comps[1] !== "vap") {
                            this.throwError("Not a top-level .vap name");
                        }
                        return [4 /*yield*/, _super.prototype._setValue.call(this, "label", comps[0])];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, _super.prototype._setValue.call(this, key, value)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, _super.prototype._setValue.call(this, key, value)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    TransferPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var registrar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        this.dump("Transfer: " + this.name, {
                            Nodehash: this.nodehash,
                            "New Owner": this.new_owner,
                        });
                        return [4 /*yield*/, this.getVapRegistrar()];
                    case 2:
                        registrar = _a.sent();
                        return [4 /*yield*/, registrar.safeTransferFrom(this.accounts[0].getAddress(), this.new_owner, vapors_1.vapors.utils.id(this.label))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TransferPlugin;
}(AccountPlugin));
cli.addPlugin("transfer", TransferPlugin);
var ReclaimPlugin = /** @class */ (function (_super) {
    __extends(ReclaimPlugin, _super);
    function ReclaimPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReclaimPlugin.getHelp = function () {
        return {
            name: "reclaim NAME",
            help: "Reset the controller by the registrant"
        };
    };
    ReclaimPlugin.prototype._setValue = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var comps, account, registrar, ownerOf, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(key === "name")) return [3 /*break*/, 8];
                        comps = value.split(".");
                        if (comps.length !== 2 || comps[1] !== "vap") {
                            this.throwError("Not a top-level .vap name");
                        }
                        return [4 /*yield*/, this.accounts[0].getAddress()];
                    case 1:
                        account = _a.sent();
                        return [4 /*yield*/, this.getVapRegistrar()];
                    case 2:
                        registrar = _a.sent();
                        ownerOf = null;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, registrar.ownerOf(vapors_1.vapors.utils.id(comps[0]))];
                    case 4:
                        ownerOf = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        this.throwError("Name not present in Permanent Registrar");
                        return [3 /*break*/, 6];
                    case 6:
                        if (account !== ownerOf) {
                            this.throwError("Only the registrant can call reclaim");
                        }
                        return [4 /*yield*/, _super.prototype._setValue.call(this, "label", comps[0])];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, _super.prototype._setValue.call(this, key, value)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReclaimPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var registrar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        this.dump("Reclaim: " + this.name, {
                            "Nodehash": this.nodehash,
                            "Address": this.address,
                        });
                        return [4 /*yield*/, this.getVapRegistrar()];
                    case 2:
                        registrar = _a.sent();
                        return [4 /*yield*/, registrar.reclaim(vapors_1.vapors.utils.id(this.label), this.address)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ReclaimPlugin;
}(AddressAccountPlugin));
cli.addPlugin("reclaim", ReclaimPlugin);
function zpad(value, length) {
    var v = String(value);
    while (v.length < length) {
        v = "0" + v;
    }
    return v;
}
function formatDate(date) {
    var count = Math.round((date.getTime() - (new Date()).getTime()) / (24 * 60 * 60 * 1000));
    return [
        date.getFullYear(),
        zpad(date.getMonth() + 1, 2),
        zpad(date.getDate(), 2)
    ].join("-") + (" (" + count + " days from now)");
}
var RenewPlugin = /** @class */ (function (_super) {
    __extends(RenewPlugin, _super);
    function RenewPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RenewPlugin.getHelp = function () {
        return {
            name: "renew NAME [ NAME ... ]",
            help: "Reset the controller by the registrant"
        };
    };
    RenewPlugin.getOptionHelp = function () {
        return [
            {
                name: "[ --duration DAYS ]",
                help: "Register duration (default: 365 days)"
            },
            {
                name: "[ --until YYYY-MM-DD ]",
                help: "Register until date"
            },
        ];
    };
    RenewPlugin.prototype.getDuration = function (startDate, until) {
        var match = until.match(/^(\d\d\d\d)-(\d\d)-(\d\d)$/);
        if (!match) {
            this.throwError("invalid date format; use YYYY-MM-DD");
        }
        var year = parseInt(match[1]);
        var month = parseInt(match[2]);
        var day = parseInt(match[3]);
        // Not perfect; allow February 30 or April 31 @TODO?
        if (month < 1 || month > 12 || day < 1 || day > 31) {
            this.throwError("date out of range");
        }
        var endDate = (new Date(year, month - 1, day)).getTime() / 1000;
        return Math.ceil(endDate - startDate);
    };
    RenewPlugin.prototype.prepareOptions = function (argParser) {
        return __awaiter(this, void 0, void 0, function () {
            var timespans, timespan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareOptions.call(this, argParser)];
                    case 1:
                        _a.sent();
                        if (this.accounts.length !== 1) {
                            this.throwError("new requires ONE account");
                        }
                        timespans = argParser.consumeMultiOptions(["duration", "until"]);
                        if (timespans.length === 1) {
                            timespan = timespans.pop();
                            if (timespan.name === "duration") {
                                this.duration = parseInt(timespan.value) * 60 * 60 * 24;
                            }
                            else if (timespan.name === "until") {
                                this.until = timespan.value;
                            }
                        }
                        else if (timespans.length > 1) {
                            this.throwError("renew requires at most ONE of --duration or --until");
                        }
                        else {
                            this.duration = 365 * 60 * 60 * 24;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RenewPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var labels;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        labels = [];
                        args.forEach(function (arg) {
                            var comps = arg.split(".");
                            if (comps.length !== 2 || comps[1] !== "vap") {
                                _this.throwError("name not supported " + JSON.stringify(arg));
                            }
                            labels.push(comps[0]);
                        });
                        this.labels = Object.freeze(labels);
                        return [2 /*return*/];
                }
            });
        });
    };
    RenewPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vapController, vapRegistrar, i, label, expiration, duration, fee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.run.call(this)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getVapController()];
                    case 2:
                        vapController = _a.sent();
                        return [4 /*yield*/, this.getVapRegistrar()];
                    case 3:
                        vapRegistrar = _a.sent();
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < this.labels.length)) return [3 /*break*/, 9];
                        label = this.labels[i];
                        console.log(label);
                        return [4 /*yield*/, vapRegistrar.nameExpires(vapors_1.vapors.utils.id(label))];
                    case 5:
                        expiration = (_a.sent()).toNumber();
                        if (expiration === 0) {
                            this.throwError("not registered: " + label);
                        }
                        duration = this.duration ? this.duration : this.getDuration(expiration, this.until);
                        if (duration < 0) {
                            this.throwError("bad duration: " + duration);
                        }
                        return [4 /*yield*/, vapController.rentPrice(label, duration)];
                    case 6:
                        fee = (_a.sent()).mul(11).div(10);
                        this.dump("Renew: " + label + ".vap", {
                            "Current Expiry": formatDate(new Date(expiration * 1000)),
                            "Duration": (duration / (24 * 60 * 60)) + " days",
                            "Until": formatDate(new Date((expiration + duration) * 1000)),
                            "Fee": vapors_1.vapors.utils.formatVapor(fee) + " (+10% buffer)",
                        });
                        return [4 /*yield*/, vapController.renew(label, duration, {
                                value: fee
                            })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 4];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return RenewPlugin;
}(EnsPlugin));
cli.addPlugin("renew", RenewPlugin);
/**
 *  To Do:
 *    register NAME --registrar
 *    set-reverse NAME
 *    renew NAME --duration DAYS
 *
 *  Done:
 *    migrate-registrar NAME
 *    transfer NAME OWNER
 *    set-subnode LABEL.NAME
 *    set-owner NAME OWNER
 *    set-resolver NAME RESOLVER
 *    set-addr NAME ADDRESS
 *    set-reverse-name ADDRESS NAME
 *    set-email NAME EMAIL
 *    set-webstie NAME WEBSITE
 *    set-text NAME KEY VALUE
 *    set-content NAME HASH
 *    reclaim NAME --address OWNER
 */
cli.run(process.argv.slice(2));
//# sourceMappingURL=vapors-ens.js.map