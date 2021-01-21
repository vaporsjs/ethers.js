Byte Manipulation
=================

This sub-module is part of the [vapors project](https://github.com/vaporsjs/vapors.js).

It is responsible for manipulating binary data.

For more information, see the [documentation](https://docs.vapors.io/v5/api/utils/bytes/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/vapors),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    isBytesLike,
    isBytes,

    arrayify,

    concat,

    stripZeros,
    zeroPad,

    isHexString,
    hexlify,

    hexDataLength,
    hexDataSlice,
    hexConcat,

    hexValue,

    hexStripZeros,
    hexZeroPad,

    splitSignature,
    joinSignature,

    // Types

    Bytes,
    BytesLike,

    DataOptions,

    Hexable,

    SignatureLike,
    Signature

} = require("@vaporsproject/bytes");
```


License
-------

MIT License
