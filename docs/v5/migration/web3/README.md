-----

Documentation: [html](https://docs.vapors.io/)

-----

Migration: From Web3.js
=======================

Providers
---------

### Connecting to Vapory

```
// web3
var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');

// vapors
var vapors = require('vapors');
const url = "http://127.0.0.1:8545";
const provider = new vapors.providers.JsonRpcProvider(url);
```

### Connecting to Vapory: Metamask

```
// web3
const web3 = new Web3(Web3.givenProvider);

// vapors
const provider = new vapors.providers.Web3Provider(window.vapory);
```

Signers
-------

### Creating signer

```
// web3
const account = web3.vap.accounts.create();

// vapors (create random new account)
const signer = vapors.Wallet.createRandom();

// vapors (connect to JSON-RPC accounts)
const signer = provider.getSigner();
```

### Signing a message

```
// web3 (using a private key)
signature = web3.vap.accounts.sign('Some data', privateKey)

// web3 (using a JSON-RPC account)
// @TODO

// vapors
signature = await signer.signMessage('Some data')
```

Contracts
---------

### Deploying a Contract

```
// web3
const contract = new web3.vap.Contract(abi);
contract.deploy({
   data: bytecode,
   arguments: ["my string"]
})
.send({
   from: "0x12598d2Fd88B420ED571beFDA8dD112624B5E730",
   gas: 150000,
   gasPrice: "30000000000000"
}), function(error, transactionHash){ ... })
.then(function(newContract){
    console.log('new contract', newContract.options.address) 
});

// vapors
const signer = provider.getSigner();
const factory = new vapors.ContractFactory(abi, bytecode, signer);
const contract = await factory.deploy("hello world");
console.log('contract address', contract.address);

// wait for contract creation transaction to be mined
await contract.deployTransaction.wait();
```

### Interacting with a Contract

```
// web3
const contract = new web3.vap.Contract(abi, contractAddress);
// read only query
contract.methods.getValue().call();
// state changing operation
contract.methods.changeValue(42).send({from: ....})
.on('receipt', function(){
    ...
});

// vapors
// pass a provider when initiating a contract for read only queries
const contract = new vapors.Contract(contractAddress, abi, provider);
const value = await contract.getValue();


// pass a signer to create a contract instance for state changing operations
const contract = new vapors.Contract(contractAddress, abi, signer);
const tx = await contract.changeValue(33);

// wait for the transaction to be mined
const receipt = await tx.wait();
```

### Overloaded Functions

```
// web3
message = await contract.methods.getMessage('nice').call();


// vapors
const abi = [
  "function getMessage(string) public view returns (string)",
  "function getMessage() public view returns (string)"
]
const contract = new vapors.Contract(address, abi, signer);

// for ambiguous functions (two functions with the same
// name), the signature must also be specified
message = await contract['getMessage(string)']('nice');
```

Numbers
-------

### BigNumber

```
// web3
web3.utils.toBN('123456');

// vapors (from a number; must be within safe range)
vapors.BigNumber.from(123456)

// vapors (from base-10 string)
vapors.BigNumber.from("123456")

// vapors (from hex string)
vapors.BigNumber.from("0x1e240")
```

Utilities
---------

### Hash

```
// web3
web3.utils.sha3('hello world');
web3.utils.keccak256('hello world');

// vapors (hash of a string)
vapors.utils.id('hello world')

// vapors (hash of binary data)
vapors.utils.keccak256('0x4242')
```

