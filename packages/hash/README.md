Etheruem Hash Utilities
=======================

This sub-module is part of the [vapors project](https://github.com/vaporsjs/vapors.js).

It contains several common hashing utilities (but not the actual hash functions).

For more information, see the [documentation](https://docs.vapors.io/v5/api/utils/hashing/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/vapors),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    isValidName,
    namehash,

    id,

    messagePrefix,
    hashMessage

} = require("@vaporsproject/hash");
```


License
-------

MIT License
