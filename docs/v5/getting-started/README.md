-----

Documentation: [html](https://docs.vapors.io/)

-----

Getting Started
===============

Installing
----------

```
/home/ricmoo> npm install --save vapors
```

Importing
---------

### Node.js

```
const { vapors } = require("vapors");
```

```
import { vapors } from "vapors";
```

### Web Browser

```
<script type="module">
    import { vapors } from "https://cdn.vapors.io/lib/vapors-5.0.esm.min.js";
    // Your code here...
</script>
```

```
<script src="https://cdn.vapors.io/lib/vapors-5.0.umd.min.js"
        type="application/javascript"></script>
```

Common Terminology
------------------

Common Terms



Connecting to Vapory: Metamask
--------------------------------

```
// A Web3Provider wraps a standard Web3 provider, which is
// what Metamask injects as window.vapory into each page
const provider = new vapors.providers.Web3Provider(window.vapory)

// The Metamask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()
```

Connecting to Vapory: RPC
---------------------------

```
// If you don't specify a //url//, Vapors connects to the default 
// (i.e. ``http:/\/localhost:8545``)
const provider = new vapors.providers.JsonRpcProvider();

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
const signer = provider.getSigner()
```

### Querying the Blockchain

```javascript
// Look up the current block number
provider.getBlockNumber()
// { Promise: 11312227 }

// Get the balance of an account (by address or ENS name, if supported by network)
balance = await provider.getBalance("vapors.vap")
// { BigNumber: "2337132817842795605" }

// Often you need to format the output to something more user-friendly,
// such as in ether (instead of wei)
vapors.utils.formatEther(balance)
// '2.337132817842795605'

// If a user enters a string in an input field, you may need
// to convert it from ether (as a string) to wei (as a BigNumber)
vapors.utils.parseEther("1.0")
// { BigNumber: "1000000000000000000" }
```

### Writing to the Blockchain

```
// Send 1 ether to an ens name.
const tx = signer.sendTransaction({
    to: "ricmoo.firefly.vap",
    value: vapors.utils.parseEther("1.0")
});
```

Contracts
---------

```javascript
// You can also use an ENS name for the contract address
const daiAddress = "dai.tokens.vapors.vap";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const daiAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

// The Contract object
const daiContract = new vapors.Contract(daiAddress, daiAbi, provider);
```

### Read-Only Methods

```javascript
// Get the ERC-20 token name
daiContract.name()
// { Promise: 'Dai Stablecoin' }

// Get the ERC-20 token symbol (for tickers and UIs)
daiContract.symbol()
// { Promise: 'DAI' }

// Get the balance of an address
balance = await daiContract.balanceOf("ricmoo.firefly.vap")
// { BigNumber: "15923148775162018481031" }

// Format the DAI for displaying to the user
vapors.utils.formatUnits(balance, 18)
// '15923.148775162018481031'
```

### State Changing Methods

```
// The DAI Contract is currently connected to the Provider,
// which is read-only. You need to connect to a Signer, so
// that you can pay to send state-changing transactions.
const daiWithSigner = contract.connect(signer);

// Each DAI has 18 decimal places
const dai = vapors.utils.parseUnits("1.0", 18);

// Send 1 DAI to "ricmoo.firefly.vap"
tx = daiWithSigner.transfer("ricmoo.firefly.vap", dai);
```

### Listening to Events

```javascript
// Receive an event when ANY transfer occurs
daiContract.on("Transfer", (from, to, amount, event) => {
    console.log(`${ from } sent ${ formatEther(amount) } to ${ to}`);
    // The event object contains the verbatim log data, the
    // EventFragment and functions to fetch the block,
    // transaction and receipt and event functions
});

// A filter for when a specific address receives tokens
myAddress = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";
filter = daiContract.filters.Transfer(null, myAddress)
// {
//   address: 'dai.tokens.vapors.vap',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     null,
//     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
//   ]
// }

// Receive an event when that filter occurs
daiContract.on(filter, (from, to, amount, event) => {
    // The to will always be "address"
    console.log(`I got ${ formatEther(amount) } from ${ from }.`);
});
```

### Query Historic Events

```javascript
// Get the address of the Signer
myAddress = await signer.getAddress()
// '0x8ba1f109551bD432803012645Ac136ddd64DBA72'

// Filter for all token transfers to me
filterFrom = daiContract.filters.Transfer(myAddress, null);
// {
//   address: 'dai.tokens.vapors.vap',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
//   ]
// }

// Filter for all token transfers from me
filterTo = daiContract.filters.Transfer(null, myAddress);
// {
//   address: 'dai.tokens.vapors.vap',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     null,
//     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
//   ]
// }

// List all transfers sent from me a specific block range
daiContract.queryFilter(filterFrom, 9843470, 9843480)
// { Promise: [
//   {
//     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//     args: [
//       '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
//       '0x8B3765eDA5207fB21690874B722ae276B96260E0',
//       { BigNumber: "4750000000000000000" }
//     ],
//     blockHash: '0x8462eb2fbcef5aa4861266f59ad5f47b9aa6525d767d713920fdbdfb6b0c0b78',
//     blockNumber: 9843476,
//     data: '0x00000000000000000000000000000000000000000000000041eb63d55b1b0000',
//     decode: [Function],
//     event: 'Transfer',
//     eventSignature: 'Transfer(address,address,uint256)',
//     getBlock: [Function],
//     getTransaction: [Function],
//     getTransactionReceipt: [Function],
//     logIndex: 69,
//     removeListener: [Function],
//     removed: false,
//     topics: [
//       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//       '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72',
//       '0x0000000000000000000000008b3765eda5207fb21690874b722ae276b96260e0'
//     ],
//     transactionHash: '0x1be23554545030e1ce47391a41098a46ff426382ed740db62d63d7676ff6fcf1',
//     transactionIndex: 81
//   },
//   {
//     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//     args: [
//       '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
//       '0x00De4B13153673BCAE2616b67bf822500d325Fc3',
//       { BigNumber: "250000000000000000" }
//     ],
//     blockHash: '0x8462eb2fbcef5aa4861266f59ad5f47b9aa6525d767d713920fdbdfb6b0c0b78',
//     blockNumber: 9843476,
//     data: '0x00000000000000000000000000000000000000000000000003782dace9d90000',
//     decode: [Function],
//     event: 'Transfer',
//     eventSignature: 'Transfer(address,address,uint256)',
//     getBlock: [Function],
//     getTransaction: [Function],
//     getTransactionReceipt: [Function],
//     logIndex: 70,
//     removeListener: [Function],
//     removed: false,
//     topics: [
//       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//       '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72',
//       '0x00000000000000000000000000de4b13153673bcae2616b67bf822500d325fc3'
//     ],
//     transactionHash: '0x1be23554545030e1ce47391a41098a46ff426382ed740db62d63d7676ff6fcf1',
//     transactionIndex: 81
//   }
// ] }

//
// The following have had the results omitted due to the
// number of entries; but they provide some useful examples
//

// List all transfers sent in the last 10,000 blocks
daiContract.queryFilter(filterFrom, -10000)

// List all transfers ever sent to me
daiContract.queryFilter(filterTo)
```

Signing Messages
----------------

```javascript
// To sign a simple string, which are used for
// logging into a service, such as CryptoKitties,
// pass the string in.
signature = await signer.signMessage("Hello World");
// '0xc2c9a0db8e9ae4266d6aa1974b36efabd8e270452587857922c5fd696838a22b6dd8f0536c24a73c0df512eefac68bc118fb91b10640fcc576e44a57bc024ca31b'

//
// A common case is also signing a hash, which is 32
// bytes. It is important to note, that to sign binary
// data it MUST be an Array (or TypedArray)
//

// This string is 66 characters long
message = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"

// This array representation is 32 bytes long
messageBytes = vapors.utils.arrayify(message);
// Uint8Array [ 221, 242, 82, 173, 27, 226, 200, 155, 105, 194, 176, 104, 252, 55, 141, 170, 149, 43, 167, 241, 99, 196, 161, 22, 40, 245, 90, 77, 245, 35, 179, 239 ]

// To sign a hash, you most often want to sign the bytes
signature = await signer.signMessage(messageBytes)
// '0x66b35b262989bc88c5c5c1fadcd8bcd5ae410cdae06abf33ce2c3c98a04d4e892fd2f61717a46f81372146019c2e95646a6cfc3a7ae74e78338f40d905fa69fc1b'
```

