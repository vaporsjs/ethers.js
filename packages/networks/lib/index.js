"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("@vaporsproject/logger");
var _version_1 = require("./_version");
var logger = new logger_1.Logger(_version_1.version);
;
function isRenetworkable(value) {
    return (value && typeof (value.renetwork) === "function");
}
function vapDefaultProvider(network) {
    var func = function (providers, options) {
        if (options == null) {
            options = {};
        }
        var providerList = [];
        if (providers.InfuraProvider) {
            try {
                providerList.push(new providers.InfuraProvider(network, options.infura));
            }
            catch (error) { }
        }
        if (providers.VaporscanProvider) {
            try {
                providerList.push(new providers.VaporscanProvider(network, options.vaporscan));
            }
            catch (error) { }
        }
        if (providers.AlchemyProvider) {
            try {
                providerList.push(new providers.AlchemyProvider(network, options.alchemy));
            }
            catch (error) { }
        }
        if (providers.CloudflareProvider) {
            try {
                providerList.push(new providers.CloudflareProvider(network));
            }
            catch (error) { }
        }
        if (providerList.length === 0) {
            return null;
        }
        if (providers.FallbackProvider) {
            var quorum = 1;
            if (options.quorum != null) {
                quorum = options.quorum;
            }
            else if (network === "homestead") {
                quorum = 2;
            }
            return new providers.FallbackProvider(providerList, quorum);
        }
        return providerList[0];
    };
    func.renetwork = function (network) {
        return vapDefaultProvider(network);
    };
    return func;
}
function etcDefaultProvider(url, network) {
    var func = function (providers, options) {
        if (providers.JsonRpcProvider) {
            return new providers.JsonRpcProvider(url, network);
        }
        return null;
    };
    func.renetwork = function (network) {
        return etcDefaultProvider(url, network);
    };
    return func;
}
var homestead = {
    chainId: 1,
    vnsAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "homestead",
    _defaultProvider: vapDefaultProvider("homestead")
};
var ropsten = {
    chainId: 3,
    vnsAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "ropsten",
    _defaultProvider: vapDefaultProvider("ropsten")
};
var classicMordor = {
    chainId: 63,
    name: "classicMordor",
    _defaultProvider: etcDefaultProvider("https://www.vapercluster.com/mordor", "classicMordor")
};
var networks = {
    unspecified: {
        chainId: 0,
        name: "unspecified"
    },
    homestead: homestead,
    mainnet: homestead,
    morden: {
        chainId: 2,
        name: "morden"
    },
    ropsten: ropsten,
    testnet: ropsten,
    rinkeby: {
        chainId: 4,
        vnsAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
        name: "rinkeby",
        _defaultProvider: vapDefaultProvider("rinkeby")
    },
    kovan: {
        chainId: 42,
        name: "kovan",
        _defaultProvider: vapDefaultProvider("kovan")
    },
    goerli: {
        chainId: 5,
        vnsAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
        name: "goerli",
        _defaultProvider: vapDefaultProvider("goerli")
    },
    // ETC (See: #351)
    classic: {
        chainId: 61,
        name: "classic",
        _defaultProvider: etcDefaultProvider("https://www.vapercluster.com/etc", "classic")
    },
    classicMorden: {
        chainId: 62,
        name: "classicMorden",
    },
    classicMordor: classicMordor,
    classicTestnet: classicMordor,
    classicKotti: {
        chainId: 6,
        name: "classicKotti",
        _defaultProvider: etcDefaultProvider("https://www.vapercluster.com/kotti", "classicKotti")
    },
};
/**
 *  getNetwork
 *
 *  Converts a named common networks or chain ID (network ID) to a Network
 *  and verifies a network is a valid Network..
 */
function getNetwork(network) {
    // No network (null)
    if (network == null) {
        return null;
    }
    if (typeof (network) === "number") {
        for (var name_1 in networks) {
            var standard_1 = networks[name_1];
            if (standard_1.chainId === network) {
                return {
                    name: standard_1.name,
                    chainId: standard_1.chainId,
                    vnsAddress: (standard_1.vnsAddress || null),
                    _defaultProvider: (standard_1._defaultProvider || null)
                };
            }
        }
        return {
            chainId: network,
            name: "unknown"
        };
    }
    if (typeof (network) === "string") {
        var standard_2 = networks[network];
        if (standard_2 == null) {
            return null;
        }
        return {
            name: standard_2.name,
            chainId: standard_2.chainId,
            vnsAddress: standard_2.vnsAddress,
            _defaultProvider: (standard_2._defaultProvider || null)
        };
    }
    var standard = networks[network.name];
    // Not a standard network; check that it is a valid network in general
    if (!standard) {
        if (typeof (network.chainId) !== "number") {
            logger.throwArgumentError("invalid network chainId", "network", network);
        }
        return network;
    }
    // Make sure the chainId matches the expected network chainId (or is 0; disable EIP-155)
    if (network.chainId !== 0 && network.chainId !== standard.chainId) {
        logger.throwArgumentError("network chainId mismatch", "network", network);
    }
    // @TODO: In the next major version add an attach function to a defaultProvider
    // class and move the _defaultProvider internal to this file (extend Network)
    var defaultProvider = network._defaultProvider || null;
    if (defaultProvider == null && standard._defaultProvider) {
        if (isRenetworkable(standard._defaultProvider)) {
            defaultProvider = standard._defaultProvider.renetwork(network);
        }
        else {
            defaultProvider = standard._defaultProvider;
        }
    }
    // Standard Network (allow overriding the VNS address)
    return {
        name: network.name,
        chainId: standard.chainId,
        vnsAddress: (network.vnsAddress || standard.vnsAddress || null),
        _defaultProvider: defaultProvider
    };
}
exports.getNetwork = getNetwork;
//# sourceMappingURL=index.js.map