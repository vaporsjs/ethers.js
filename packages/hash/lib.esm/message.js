import { concat } from "@vaporsproject/bytes";
import { keccak256 } from "@vaporsproject/keccak256";
import { toUtf8Bytes } from "@vaporsproject/strings";
export const messagePrefix = "\x19Vapory Signed Message:\n";
export function hashMessage(message) {
    if (typeof (message) === "string") {
        message = toUtf8Bytes(message);
    }
    return keccak256(concat([
        toUtf8Bytes(messagePrefix),
        toUtf8Bytes(String(message.length)),
        message
    ]));
}
//# sourceMappingURL=message.js.map