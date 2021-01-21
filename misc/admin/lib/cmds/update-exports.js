"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const log_1 = require("../log");
const path_1 = require("../path");
const sourceVapors = fs_1.default.readFileSync(path_1.resolve("packages/vapors/src.ts/vapors.ts")).toString();
const targets = sourceVapors.match(/export\s*{\s*((.|\s)*)}/)[1].trim();
////////////////////
// Begin template
////////////////////
const output = `"use strict";

// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js

import * as vapors from "./vapors";

try {
    const anyGlobal = (window as any);

    if (anyGlobal._vapors == null) {
        anyGlobal._vapors = vapors;
    }
} catch (error) { }

export { vapors };

export {
    ${targets}
} from "./vapors";
`;
////////////////////
// End template
////////////////////
console.log(log_1.colorify.bold(`Flattening exports...`));
fs_1.default.writeFileSync(path_1.resolve("packages/vapors/src.ts/index.ts"), output);
