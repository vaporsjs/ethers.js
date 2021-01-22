export declare type Network = {
    name: string;
    chainId: number;
    vnsAddress?: string;
    _defaultProvider?: (providers: any, options?: any) => any;
};
export declare type Networkish = Network | string | number;
