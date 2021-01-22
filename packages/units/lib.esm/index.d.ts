import { BigNumber, BigNumberish } from "@vaporsproject/bignumber";
export declare function commify(value: string | number): string;
export declare function formatUnits(value: BigNumberish, unitName?: string | BigNumberish): string;
export declare function parseUnits(value: string, unitName?: BigNumberish): BigNumber;
export declare function formatVapor(wei: BigNumberish): string;
export declare function parseVapor(vapor: string): BigNumber;
