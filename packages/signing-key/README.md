Signing Key
===========

This sub-module is part of the [vapors project](https://github.com/vaporsjs/vapors.js).

It is responsible for secp256-k1 signing, verifying and recovery operations.

For more information, see the [documentation](https://docs.vapors.io/v5/api/utils/signing-key/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/vapors),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    SigningKey,

    computePublicKey,
    recoverPublicKey

} = require("@vaporsproject/signing-key");
```

License
-------

MIT License
