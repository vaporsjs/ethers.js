SHA2 Hash Functions
===================

This sub-module is part of the [vapors project](https://github.com/vaporsjs/vapors.js).

It is responsible for common cryptographic hashes and HMAC.

For more information, see the [documentation](https://docs.vapors.io/v5/api/utils/hashing/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/vapors),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    ripemd160,

    sha256,
    sha512,

    computeHmac,

    // Enums

    SupportedAlgorithm

} = require("@vaporsproject/sha2");
```


License
-------

MIT License
