Vapory Providers
==================

This sub-module is part of the [vapors project](https://github.com/vaporsjs/vapors.js).

It contains common Provider classes, utility functions for dealing with providers
and re-exports many of the classes and types needed implement a custom Provider.

For more information, see the [documentation](https://docs.vapors.io/v5/api/providers/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/vapors),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    Provider,
    BaseProvider,

    JsonRpcProvider,
    StaticJsonRpcProvider,
    UrlJsonRpcProvider,

    FallbackProvider,

    AlchemyProvider,
    CloudflareProvider,
    VaporscanProvider,
    InfuraProvider,
    NodesmithProvider,

    IpcProvider,

    Web3Provider,

    WebSocketProvider,

    JsonRpcSigner,

    getDefaultProvider,

    getNetwork,

    Formatter,

    // Types

    TransactionReceipt,
    TransactionRequest,
    TransactionResponse,

    Listener,

    ExternalProvider,

    Block,
    BlockTag,
    EventType,
    Filter,
    Log,

    JsonRpcFetchFunc,

    Network,
    Networkish

} = require("@vaporsproject/providers");
```


License
-------

MIT License
