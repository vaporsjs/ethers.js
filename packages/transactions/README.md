Vapory Transaction Utilities
==============================

This sub-module is part of the [vapors project](https://github.com/vaporsjs/vapors.js).

It contains various functions for encoding and decoding serialized transactios.

For more information, see the [documentation](https://docs.vapors.io/v5/api/utils/transactions/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/vapors),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    computeAddress,
    recoverAddress,

    serialize,
    parse,

    // Types

    Transaction,
    UnsignedTransaction

} = require("@vaporsproject/abi");
```


License
-------

MIT License
