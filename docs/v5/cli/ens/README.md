-----

Documentation: [html](https://docs.vapors.io/)

-----

Vapory Naming Service
=======================

Help
----

```
Usage:
   vapors-vns COMMAND [ ARGS ] [ OPTIONS ]

COMMANDS
   lookup [ NAME | ADDRESS [ ... ] ]
                              Lookup a name or address
   commit NAME                Submit a pre-commitment
      [ --duration DAYS ]        Register duration (default: 365 days)
      [ --salt SALT ]            SALT to blind the commit with
      [ --secret SECRET ]        Use id(SECRET) as the salt
      [ --owner OWNER ]          The target owner (default: current account)
   reveal NAME                Reveal a previous pre-commitment
      [ --duration DAYS ]        Register duration (default: 365 days)
      [ --salt SALT ]            SALT to blind the commit with
      [ --secret SECRET ]        Use id(SECRET) as the salt
      [ --owner OWNER ]          The target owner (default: current account)
   set-controller NAME        Set the controller (default: current account)
      [ --address ADDRESS ]      Specify another address
   set-subnode NAME           Set a subnode owner (default: current account)
      [ --address ADDRESS ]      Specify another address
   set-resolver NAME          Set the resolver (default: resolver.vap)
      [ --address ADDRESS ]      Specify another address
   set-addr NAME              Set the addr record (default: current account)
      [ --address ADDRESS ]      Specify another address
   set-text NAME KEY VALUE    Set a text record
   set-email NAME EMAIL       Set the email text record
   set-website NAME URL       Set the website text record
   set-content NAME HASH      Set the IPFS Content Hash
   migrate-registrar NAME     Migrate from the Legacy to the Permanent Registrar
   transfer NAME NEW_OWNER    Transfer registrant ownership
   reclaim NAME               Reset the controller by the registrant
      [ --address ADDRESS ]      Specify another address

ACCOUNT OPTIONS
  --account FILENAME          Load from a file (JSON, RAW or mnemonic)
  --account RAW_KEY           Use a private key (insecure *)
  --account 'MNEMONIC'        Use a mnemonic (insecure *)
  --account -                 Use secure entry for a raw key or mnemonic
  --account-void ADDRESS      Use an address as a void signer
  --account-void VNS_NAME     Add the resolved address as a void signer
  --account-rpc ADDRESS       Add the address from a JSON-RPC provider
  --account-rpc INDEX         Add the index from a JSON-RPC provider
  --mnemonic-password         Prompt for a password for mnemonics
  --xxx-mnemonic-password     Prompt for a (experimental) hard password

PROVIDER OPTIONS (default: all + homestead)
  --alchemy                   Include Alchemy
  --vaporscan                 Include Vaporscan
  --infura                    Include INFURA
  --nodesmith                 Include nodesmith
  --rpc URL                   Include a custom JSON-RPC
  --offline                   Dump signed transactions (no send)
  --network NETWORK           Network to connect to (default: homestead)

TRANSACTION OPTIONS (default: query network)
  --gasPrice GWEI             Default gas price for transactions(in wei)
  --gasLimit GAS              Default gas limit for transactions
  --nonce NONCE               Initial nonce for the first transaction
  --yes                       Always accept Signing and Sending

OTHER OPTIONS
  --wait                      Wait until transactions are mined
  --debug                     Show stack traces for errors
  --help                      Show this usage and exit
  --version                   Show this version and exit

(*) By including mnemonics or private keys on the command line they are
    possibly readable by other users on your system and may get stored in
    your bash history file. This is NOT recommended.
```

Examples
--------

