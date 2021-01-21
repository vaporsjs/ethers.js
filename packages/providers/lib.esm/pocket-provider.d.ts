import { Network } from "@vaporsproject/networks";
import { ConnectionInfo } from "@vaporsproject/web";
import { UrlJsonRpcProvider } from "./url-json-rpc-provider";
export declare class PocketProvider extends UrlJsonRpcProvider {
    readonly applicationId: string;
    readonly applicationSecretKey: string;
    static getApiKey(apiKey: any): any;
    static getUrl(network: Network, apiKey: any): ConnectionInfo;
    isCommunityResource(): boolean;
}
