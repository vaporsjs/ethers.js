Vapory Unit Conversion Utilities
==================================

This sub-module is part of the [vapors project](https://github.com/vaporsjs/vapors.js).

It contains functions to convert between string representations and numeric
representations of numbers, including those out of the range of JavaScript.

For more information, see the [documentation](https://docs.vapors.io/v5/api/utils/display-logic/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/vapors),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    formatUnits,
    parseUnits,

    formatVapor,
    parseVapor,

    commify

} = require("@vaporsproject/units");
```


License
-------

MIT License
