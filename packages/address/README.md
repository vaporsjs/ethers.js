Vapory Address Utilities
==========================

This sub-module is part of the [vapors project](https://github.com/vaporsjs/vapors.js).

It is responsible for encoding, verifying and computing checksums for
Vapory addresses and computing special addresses, such as those
enerated by and for contracts under various situations.

For more information, see the [documentation](https://docs.vapors.io/v5/api/utils/address/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/vapors),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    getAddress,
    isAddress,

    getIcapAddress,

    getContractAddress,
    getCreate2Address

} = require("@vaporsproject/address");
```

License
-------

MIT License
