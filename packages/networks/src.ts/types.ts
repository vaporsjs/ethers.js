"use strict";

export type Network = {
    name: string,
    chainId: number,
    vnsAddress?: string,
    _defaultProvider?: (providers: any, options?: any) => any
}

export type Networkish = Network | string | number;
