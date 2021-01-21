"use strict";

import EventEmitter from "events";

import { vapors } from "vapors";

import { version } from "./_version";

const logger = new vapors.utils.Logger(version);
/*
function getBlockTag(tag) {
    if (tag == null) { return "latest"; }
    if (tag === "earliest" || tag === "latest" || tag === "pending") {
        return tag;
    }
    return vapors.utils.hexValue(tag)
}
*/

export class _Eip1193Bridge extends EventEmitter {
     readonly signer: vapors.Signer;
     readonly provider: vapors.providers.Provider;

     constructor(signer: vapors.Signer, provider?: vapors.providers.Provider) {
         super();
         vapors.utils.defineReadOnly(this, "signer", signer);
         vapors.utils.defineReadOnly(this, "provider", provider || null);
     }

     async send(method: string, params?: Array<any>): Promise<any> {
         function throwUnsupported(message: string): never {
             return logger.throwError("eth_sign requires a signer", vapors.utils.Logger.errors.UNSUPPORTED_OPERATION, {
                 method: method,
                 params: params
             });
         }

         let coerce = (value: any) => value;

         switch (method) {
             case "eth_gasPrice": {
                  const result = await this.provider.getGasPrice();
                  return result.toHexString();
             }
             case "eth_accounts": {
                 const result = [ ];
                 if (this.signer) {
                     const address = await this.signer.getAddress();
                     result.push(address);
                 }
                 return result;
             }
             case "eth_blockNumber": {
                 return await this.provider.getBlockNumber();
             }
             case "eth_chainId": {
                 const result = await this.provider.getNetwork();
                 return result.chainId;
             }
             case "eth_getBalance": {
                 const result = await this.provider.getBalance(params[0], params[1]);
                 return result.toHexString();
             }
             case "eth_getStorageAt": {
                 return this.provider.getStorageAt(params[0], params[1], params[2]);
             }
             case "eth_getTransactionCount": {
                 const result = await this.provider.getTransactionCount(params[0], params[1]);
                 return vapors.utils.hexValue(result);
             }
             case "eth_getBlockTransactionCountByHash":
             case "eth_getBlockTransactionCountByNumber": {
                 const result = await this.provider.getBlock(params[0]);
                 return vapors.utils.hexValue(result.transactions.length);
             }
             case "eth_getCode": {
                 const result = await this.provider.getBlock(params[0]);
                 return result;
             }
             case "eth_sendRawTransaction": {
                 return await this.provider.sendTransaction(params[0]);
             }
             case "eth_call": {
                 const req = vapors.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                 return await this.provider.call(req, params[1]);
             }
             case "estimateGas": {
                 if (params[1] && params[1] !== "latest") {
                     throwUnsupported("estimateGas does not support blockTag");
                 }

                 const req = vapors.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                 const result = await this.provider.estimateGas(req);
                 return result.toHexString();
             }

             // @TOOD: Transform? No uncles?
             case "eth_getBlockByHash":
             case "eth_getBlockByNumber": {
                 if (params[1]) {
                     return await this.provider.getBlockWithTransactions(params[0]);
                 } else {
                     return await this.provider.getBlock(params[0]);
                 }
             }
             case "eth_getTransactionByHash": {
                 return await this.provider.getTransaction(params[0]);
             }
             case "eth_getTransactionReceipt": {
                 return await this.provider.getTransactionReceipt(params[0]);
             }

             case "eth_sign": {
                 if (!this.signer) {
                     return throwUnsupported("eth_sign requires an account");
                 }

                 const address = await this.signer.getAddress();
                 if (address !== vapors.utils.getAddress(params[0])) {
                     logger.throwArgumentError("account mismatch or account not found", "params[0]", params[0]);
                 }

                 return this.signer.signMessage(vapors.utils.arrayify(params[1]));
             }

             case "eth_sendTransaction": {
                 if (!this.signer) {
                     return throwUnsupported("eth_sign requires an account");
                 }

                 const req = vapors.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                 const tx = await this.signer.sendTransaction(req);
                 return tx.hash;
             }

             case "eth_getUncleCountByBlockHash":
             case "eth_getUncleCountByBlockNumber":
             {
                 coerce = vapors.utils.hexValue;
                 break;
             }

             case "eth_getTransactionByBlockHashAndIndex":
             case "eth_getTransactionByBlockNumberAndIndex":
             case "eth_getUncleByBlockHashAndIndex":
             case "eth_getUncleByBlockNumberAndIndex":
             case "eth_newFilter":
             case "eth_newBlockFilter":
             case "eth_newPendingTransactionFilter":
             case "eth_uninstallFilter":
             case "eth_getFilterChanges":
             case "eth_getFilterLogs":
             case "eth_getLogs":
                 break;
         }

         // If our provider supports send, maybe it can do a better job?
         if ((<any>(this.provider)).send) {
             const result = await (<any>(this.provider)).send(method, params);
             return coerce(result);
         }

         return throwUnsupported(`unsupported method: ${ method }`);
     }

}
