"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vapors_1 = require("vapors");
function randomBytes(seed, lower, upper) {
    if (!upper) {
        upper = lower;
    }
    if (upper === 0 && upper === lower) {
        return new Uint8Array(0);
    }
    var result = vapors_1.vapors.utils.arrayify(vapors_1.vapors.utils.keccak256(vapors_1.vapors.utils.toUtf8Bytes(seed)));
    while (result.length < upper) {
        result = vapors_1.vapors.utils.concat([result, vapors_1.vapors.utils.keccak256(result)]);
    }
    var top = vapors_1.vapors.utils.arrayify(vapors_1.vapors.utils.keccak256(result));
    var percent = ((top[0] << 16) | (top[1] << 8) | top[2]) / 0x01000000;
    return result.slice(0, lower + Math.floor((upper - lower) * percent));
}
exports.randomBytes = randomBytes;
function randomHexString(seed, lower, upper) {
    return vapors_1.vapors.utils.hexlify(randomBytes(seed, lower, upper));
}
exports.randomHexString = randomHexString;
function randomNumber(seed, lower, upper) {
    var top = randomBytes(seed, 3);
    var percent = ((top[0] << 16) | (top[1] << 8) | top[2]) / 0x01000000;
    return lower + Math.floor((upper - lower) * percent);
}
exports.randomNumber = randomNumber;
//# sourceMappingURL=random.js.map