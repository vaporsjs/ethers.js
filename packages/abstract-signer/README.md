Abstract Signer
===============

This sub-module is part of the [vapors project](https://github.com/vaporsjs/vapors.js).

It is an abstraction of an Vapory account, which may be backed by a [private key](https://www.npmjs.com/package/@vaporsproject/wallet),
signing service (such as Geth or Parity with key managment enabled, or a
dedicated signing service such as Clef),
[hardware wallets](https://www.npmjs.com/package/@vaporsproject/hardware-wallets), etc.

For more information, see the [documentation](https://docs.vapors.io/v5/api/signer/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/vapors),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    Signer,
    VoidSigner,

    // Types
    ExternallyOwnedAccount

} = require("@vaporsproject/abstract-signer");
```

License
-------

MIT License
