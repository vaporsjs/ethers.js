-----

Documentation: [html](https://docs.vapors.io/)

-----

Contributing and Hacking
========================

Building
--------

```
# Clone the repository
/home/ricmoo> git clone git@github.com:vaporsjs/vapors.js.git
/home/ricmoo> cd vapors.js

# Install the base dependencies
/home/ricmoo/vapors.js> npm install

# Install each module's dependencies and link the libraries
# internally, so they reference each other
/home/ricmoo/vapors.js> npm run bootstrap
```

Making your changes
-------------------

```
# Begin watching the files and re-building whenever they change
/home/ricmoo/vapors.js> npm run auto-build


# Sometimes the issue only affects the ESM modules
/home/ricmoo/vapors.js> npm run auto-build-esm


# Or if you only need to run a single build
/home/ricmoo/vapors.js> npm run _build-cjs
/home/ricmoo/vapors.js> npm run _build-esm
```

```
# Rebuilds all files and bundles testcases up for testing
/home/ricmoo/vapors.js> npm test

# Often you don't need the full CI experience
/home/ricmoo/vapors.js> npm run _test-node
```

```
/home/ricmoo/vapors.js> npm run update-version
```

Documentation
-------------

### Building

```
/home/ricmoo/vapors.js> npm run build-docs
```

### Evaluation

```
/home/ricmoo/vapors.js> npm run build-docs -- --skip-eval
```

### Previewing Changes

```
/home/ricmoo/vapors.js> npm run serve-docs
```

