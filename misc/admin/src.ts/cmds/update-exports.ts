"use strict";

import fs from "fs";

import { colorify } from "../log";
import { resolve } from "../path";

const sourceVapors = fs.readFileSync(resolve("packages/vapors/src.ts/vapors.ts")).toString();
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
    ${ targets }
} from "./vapors";
`;

////////////////////
// End template
////////////////////

console.log(colorify.bold(`Flattening exports...`))

fs.writeFileSync(resolve("packages/vapors/src.ts/index.ts"), output);
