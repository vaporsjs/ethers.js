Solidity Packed-Encoding Utilities
==================================

This sub-module is part of the [vapors project](https://github.com/vaporsjs/vapors.js).

It contains functions to perform Solidity-specific packed (i.e. non-standard)
encoding operations.

For more information, see the [documentation](https://docs.vapors.io/v5/api/utils/hashing/#utils--solidity-hashing).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/vapors),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    pack,
    keccak256,
    sha256

} = require("@vaporsproject/solidity");
```


License
-------

MIT License
