-----

Documentation: [html](https://docs.vapors.io/)

-----

Hardware Wallets
================

LedgerSigner
------------

```
import { LedgerSigner } from "@vaporsproject/hardware-wallets";
```

### API

#### **new ****LedgerSigner**( [ provider [ , type [ , path ] ] ] ) => *[LedgerSigner](/v5/api/other/hardware/#hw-ledger)*

Connects to a Ledger Hardware Wallet. The *type* if left unspecified is determined by the environment; in node the default is "hid" and in the browser "u2f" is the default. The default Vapory path is used if *path* is left unspecified.


