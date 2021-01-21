Property Utilities
==================

This sub-module is part of the [vapors project](https://github.com/vaporsjs/vapors.js).

It contains several useful utility methods for managing simple objects with
defined properties.

For more information, see the [documentation](https://docs.vapors.io/v5/api/utils/properties/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/vapors),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    defineReadOnly,

    getStatic,

    resolveProperties,
    checkProperties,

    shallowCopy,
    deepCopy,

    Description,

    // Types

    Deferrable

} = require("@vaporsproject/properties");
```


License
-------

MIT License
