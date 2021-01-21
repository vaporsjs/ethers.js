import { ContractCode } from "./solc";
export declare const header = "import { vapors } from \"vapors\";\n\n";
export declare function generate(contract: ContractCode, bytecode?: string): string;
