import { Bytes } from "@vaporsproject/bytes";
export declare const messagePrefix = "\u0019Vapory Signed Message:\n";
export declare function hashMessage(message: Bytes | string): string;
