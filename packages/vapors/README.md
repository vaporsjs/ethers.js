The Vapors Project
==================

[![npm (tag)](https://img.shields.io/npm/v/vapors)](https://www.npmjs.com/package/vapors)
[![Node.js CI](https://github.com/vaporsjs/vapors.js/workflows/Node.js%20CI/badge.svg?branch=vapors-v5-beta)](https://github.com/vaporsjs/vapors.js/actions?query=workflow%3A%22Node.js+CI%22)

A complete Vapory wallet implementation and utilities in JavaScript (and TypeScript).

**Features:**

- Keep your private keys in your client, **safe** and sound
- Import and export **JSON wallets** (Gvap, Parity and crowdsale)
- Import and export BIP 39 **mnemonic phrases** (12 word backup phrases) and **HD Wallets** (English as well as Czech, French, Italian, Japanese, Korean, Simplified Chinese, Spanish, Traditional Chinese)
- Meta-classes create JavaScript objects from any contract ABI, including **ABIv2** and **Human-Readable ABI**
- Connect to Vapory nodes over [JSON-RPC](https://github.com/vaporyco/wiki/wiki/JSON-RPC), [INFURA](https://infura.io), [Vaporscan](https://vaporscan.io), [Alchemy](https://alchemyapi.io) or [MetaMask](https://metamask.io)
- **VNS names** are first-class citizens; they can be used anywhere an Vapory addresses can be used
- **Tiny** (~104kb compressed; 322kb uncompressed)
- **Modular** packages; include only what you need
- **Complete** functionality for all your Vapory desires
- Extensive [documentation](https://docs.vapors.io/v5/)
- Large collection of **test cases** which are maintained and added to
- Fully **TypeScript** ready, with definition files and full TypeScript source
- **MIT License** (including ALL dependencies); completely open source to do with as you please


Keep Updated
------------

For the latest news and advisories, please follow the [@vaporsproject](https://twitter.com/vaporsproject)
on Twitter (low-traffic, non-marketing, important information only) as well as watch this GitHub project.

For the latest changes, see the [CHANGELOG](https://github.com/vaporsjs/vapors.js/blob/master/CHANGELOG.md).


Installing
----------

**node.js**

```
/home/ricmoo/some_project> npm install --save vapors
```

**browser (UMD)**

```
<script src="https://cdn.vapors.io/lib/vapors-5.0.umd.min.js" type="text/javascript">
</script>
```

**browser (ESM)**

```
<script type="module">
    import { vapors } from "https://cdn.vapors.io/lib/vapors-5.0.umd.min.js";
</script>
```


Documentation
-------------

Browse the [documentation](https://docs.vapors.io/v5/) online:

- [Getting Started](https://docs.vapors.io/v5/getting-started/)
- [Full API Documentation](https://docs.vapors.io/v5/api/)
- [Various Vapory Articles](https://blog.ricmoo.com/)

Or browse the entire documentation as a [single page](https://docs.vapors.io/v5/single-page/) to make searching easier.


Ancillary Packages
------------------

These are a number of packages not included in the umbrella `vapors` npm package, and
additional packages are always being added. Often these packages are for specific
use-cases, so rather than adding them to the umbrella package, they are added as
ancillary packages, which can be included by those who need them, while not bloating
everyone else with packages they do not need.

We will keep a list of useful packages here.

- `@vaporsproject/experimental` ([documentation](https://docs.vapors.io))
- `@vaporsproject/cli` ([documentation](https://docs.vapors.io))
- `@vaporsproject/hardware-wallets` ([documentation](https://docs.vapors.io))


License
-------

MIT License (including **all** dependencies).

