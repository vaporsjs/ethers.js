/* istanbul ignore file */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vapors_1 = require("vapors");
function getType(param, flexible) {
    if (param.type === "address" || param.type === "string") {
        return "string";
    }
    if (param.type === "bool") {
        return "boolean";
    }
    if (param.type.substring(0, 5) === "bytes") {
        if (flexible) {
            return "string | vapors.utils.BytesLike";
        }
        return "string";
    }
    var match = param.type.match(/^(u?int)([0-9]+)$/);
    if (match) {
        if (flexible) {
            return "vapors.BigNumberish";
        }
        if (parseInt(match[2]) < 53) {
            return 'number';
        }
        return 'vapors.BigNumber';
    }
    if (param.type === "array") {
        return "Array<" + getType(param.arrayChildren) + ">";
    }
    if (param.type === "tuple") {
        var struct = param.components.map(function (p, i) { return (p.name || "p_" + i) + ": " + getType(p, flexible); });
        return "{ " + struct.join(", ") + " }";
    }
    throw new Error("unknown type");
    return null;
}
exports.header = "import { vapors } from \"vapors\";\n\n";
function generate(contract, bytecode) {
    var lines = [];
    lines.push("export class " + contract.name + " extends vapors.Contract {");
    lines.push("");
    lines.push("    constructor(addressOrName: string, providerOrSigner: vapors.Signer | vapors.providers.Provider) {");
    lines.push("        super(addressOrName, new.target.ABI(), providerOrSigner)");
    lines.push("    }");
    lines.push("");
    lines.push("    connect(providerOrSigner: vapors.Signer | vapors.providers.Provider): " + contract.name + " {");
    lines.push("        return new (<{ new(...args: any[]): " + contract.name + " }>(this.constructor))(this.address, providerOrSigner)");
    lines.push("    }");
    lines.push("");
    lines.push("    attach(addressOrName: string): " + contract.name + " {");
    lines.push("        return new (<{ new(...args: any[]): " + contract.name + " }>(this.constructor))(addressOrName, this.signer || this.provider)");
    lines.push("    }");
    var _loop_1 = function (signature) {
        if (signature.indexOf('(') === -1) {
            return "continue";
        }
        var fragment = contract.interface.functions[signature];
        console.log(fragment);
        var output_1 = "Promise<vapors.providers.TransactionResponse>";
        var overrides = "vapors.CallOverrides";
        if (fragment.constant == false) {
            if (fragment.payable) {
                overrides = "vapors.PayableOverrides";
            }
            else {
                overrides = "vapors.Overrides";
            }
        }
        else if (fragment.outputs.length > 0) {
            if (fragment.outputs.length === 1) {
                output_1 = "Promise<" + getType(fragment.outputs[0]) + ">";
            }
            else {
                // If all output parameters are names, we can specify the struct
                if (fragment.outputs.filter(function (o) { return (!!o.name); }).length === fragment.outputs.length) {
                    output_1 = "Promise<{ " + fragment.outputs.map(function (o, i) {
                        return ((o.name || ("arg" + String(i))) + ": " + getType(o));
                    }).join(", ") + " }>";
                }
                else {
                    // Otherwise, all we know is that it will be an Array
                    output_1 = "Promise<{ Array<any> }>";
                }
            }
        }
        var inputs = [];
        var passed = [];
        fragment.inputs.forEach(function (input, index) {
            var name = (input.name || ("p_" + index));
            var type = getType(input, true);
            inputs.push(name + ": " + type);
            passed.push(name);
        });
        inputs.push("_overrides?: " + overrides);
        passed.push("_overrides");
        lines.push("");
        lines.push("    " + fragment.name + "(" + inputs.join(', ') + "): " + output_1 + " {");
        lines.push("        return this.functions[\"" + signature + "\"](" + passed.join(", ") + ");");
        lines.push("    }");
    };
    for (var signature in contract.interface.functions) {
        _loop_1(signature);
    }
    lines.push("");
    lines.push("    static factory(signer?: vapors.Signer): vapors.ContractFactory {");
    lines.push("        return new vapors.ContractFactory(" + contract.name + ".ABI(), " + contract.name + ".bytecode(), signer);");
    lines.push("    }");
    lines.push("");
    lines.push("    static bytecode(): string {");
    if (bytecode == null) {
        lines.push('        return vapors.errors.throwError("no bytecode provided during generation", vapors.errors.UNSUPPORTED_OPERATION, { operation: "contract.bytecode" });');
    }
    else {
        lines.push('        return "' + bytecode + '";');
    }
    lines.push("    }");
    lines.push("");
    lines.push("    static ABI(): Array<string> {");
    lines.push("        return [");
    contract.interface.fragments.forEach(function (fragment) {
        lines.push("            \"" + fragment.format(vapors_1.vapors.utils.FormatTypes.full) + "\",");
    });
    lines.push("        ];");
    lines.push("    }");
    lines.push("}");
    var output = lines.join("\n") + "\n";
    return output;
}
exports.generate = generate;
//# sourceMappingURL=typescript.js.map