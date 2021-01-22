declare module "hw-app-vap" {
    export type PublicAccount = {
        publicKey: string;
        address: string;
        chainCode: string;
    };

    export type Config = {
        arbitraryDataEnabled: number,
        version: string
    };

    export type Signature = {
        r: string,
        s: string,
        v: number
    };

    export class Transport { }

    export class Vap {
        constructor(transport: Transport);
        getAppConfiguration(): Promise<Config>;
        getAddress(path: string): Promise<PublicAccount>;
        signPersonalMessage(path: string, message: string): Promise<Signature>;
        signTransaction(path: string, unsignedTx: string): Promise<Signature>;
    }

    export default Vap;
}

declare module "@ledgerhq/hw-transport-node-hid" {
    export function create(): Promise<Transport>;
}

declare module "@ledgerhq/hw-transport-u2f" {
    export function create(): Promise<Transport>;
}
