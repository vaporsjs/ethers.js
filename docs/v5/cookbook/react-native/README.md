-----

Documentation: [html](https://docs.vapors.io/)

-----

React Native (and ilk)
======================

Installing
----------

```
/home/ricmoo/my-react-project> npm install @vaporsproject/shims --save
```

```
// Pull in the shims (BEFORE importing vapors)
import "@vaporsproject/shims"

// Import the vapors library
import { vapors } from "vapors";
```

Security
--------

```
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"

// Import the the vapors shims (**BEFORE** vapors)
import "@vaporsproject/shims"

// Import the vapors library
import { vapors } from "vapors";
```

