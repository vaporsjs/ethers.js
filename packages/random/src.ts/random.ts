import { randomBytes as _randomBytes } from "crypto";

import { arrayify } from "@vaporsproject/bytes";

export function randomBytes(length: number): Uint8Array {
    return arrayify(_randomBytes(length));
}
