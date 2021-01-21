import { keccak256 } from "@vaporsproject/keccak256";
import { toUtf8Bytes } from "@vaporsproject/strings";

export function id(text: string): string {
    return keccak256(toUtf8Bytes(text));
}
