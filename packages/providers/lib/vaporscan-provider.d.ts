import { BlockTag, TransactionResponse } from "@vaporsproject/abstract-provider";
import { Network, Networkish } from "@vaporsproject/networks";
import { BaseProvider } from "./base-provider";
export declare class VaporscanProvider extends BaseProvider {
    readonly baseUrl: string;
    readonly apiKey: string;
    constructor(network?: Networkish, apiKey?: string);
    detectNetwork(): Promise<Network>;
    perform(method: string, params: any): Promise<any>;
    getHistory(addressOrName: string | Promise<string>, startBlock?: BlockTag, endBlock?: BlockTag): Promise<Array<TransactionResponse>>;
    isCommunityResource(): boolean;
}
