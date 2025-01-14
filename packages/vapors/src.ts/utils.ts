"use strict";

import { AbiCoder, checkResultErrors, defaultAbiCoder, EventFragment, FormatTypes, Fragment, FunctionFragment, Indexed, Interface, LogDescription, ParamType, Result, TransactionDescription }from "@vaporsproject/abi";
import { getAddress, getCreate2Address, getContractAddress, getIcapAddress, isAddress } from "@vaporsproject/address";
import * as base64 from "@vaporsproject/base64";
import { Base58 as base58 } from "@vaporsproject/basex";
import { arrayify, concat, hexConcat, hexDataSlice, hexDataLength, hexlify, hexStripZeros, hexValue, hexZeroPad, isBytes, isBytesLike, isHexString, joinSignature, zeroPad, splitSignature, stripZeros } from "@vaporsproject/bytes";
import { _TypedDataEncoder, hashMessage, id, isValidName, namehash } from "@vaporsproject/hash";
import { defaultPath, entropyToMnemonic, HDNode, isValidMnemonic, mnemonicToEntropy, mnemonicToSeed } from "@vaporsproject/hdnode";
import { getJsonWalletAddress } from "@vaporsproject/json-wallets";
import { keccak256 } from "@vaporsproject/keccak256";
import { Logger } from "@vaporsproject/logger";
import { computeHmac, ripemd160, sha256, sha512 } from "@vaporsproject/sha2";
import { keccak256 as solidityKeccak256, pack as solidityPack, sha256 as soliditySha256 } from "@vaporsproject/solidity";
import { randomBytes, shuffled } from "@vaporsproject/random";
import { checkProperties, deepCopy, defineReadOnly, getStatic, resolveProperties, shallowCopy } from "@vaporsproject/properties";
import * as RLP from "@vaporsproject/rlp";
import { computePublicKey, recoverPublicKey, SigningKey } from "@vaporsproject/signing-key";
import { formatBytes32String, nameprep, parseBytes32String, _toEscapedUtf8String, toUtf8Bytes, toUtf8CodePoints, toUtf8String, Utf8ErrorFuncs } from "@vaporsproject/strings";
import { computeAddress, parse as parseTransaction, recoverAddress, serialize as serializeTransaction } from "@vaporsproject/transactions";
import { commify, formatVapor, parseVapor, formatUnits, parseUnits } from "@vaporsproject/units";
import { verifyMessage, verifyTypedData } from "@vaporsproject/wallet";
import { _fetchData, fetchJson, poll } from "@vaporsproject/web";

////////////////////////
// Enums

import { SupportedAlgorithm } from "@vaporsproject/sha2";
import { UnicodeNormalizationForm, Utf8ErrorReason } from "@vaporsproject/strings";
import { UnsignedTransaction } from "@vaporsproject/transactions";

////////////////////////
// Types and Interfaces

import { CoerceFunc } from "@vaporsproject/abi";
import { Bytes, BytesLike, Hexable } from "@vaporsproject/bytes"
import { Mnemonic } from "@vaporsproject/hdnode";
import { EncryptOptions, ProgressCallback } from "@vaporsproject/json-wallets";
import { Deferrable } from "@vaporsproject/properties";
import { Utf8ErrorFunc } from "@vaporsproject/strings";
import { ConnectionInfo, FetchJsonResponse, OnceBlockable, OncePollable, PollOptions } from "@vaporsproject/web";

////////////////////////
// Exports

export {
    AbiCoder,
    defaultAbiCoder,

    Fragment,
    EventFragment,
    FunctionFragment,
    ParamType,
    FormatTypes,

    checkResultErrors,
    Result,

    Logger,

    RLP,

    _fetchData,
    fetchJson,
    poll,

    checkProperties,
    deepCopy,
    defineReadOnly,
    getStatic,
    resolveProperties,
    shallowCopy,

    arrayify,

    concat,
    stripZeros,
    zeroPad,

    isBytes,
    isBytesLike,

    defaultPath,
    HDNode,
    SigningKey,

    Interface,

    LogDescription,
    TransactionDescription,

    base58,
    base64,

    hexlify,
    isHexString,
    hexConcat,
    hexStripZeros,
    hexValue,
    hexZeroPad,
    hexDataLength,
    hexDataSlice,

    nameprep,
    _toEscapedUtf8String,
    toUtf8Bytes,
    toUtf8CodePoints,
    toUtf8String,
    Utf8ErrorFuncs,

    formatBytes32String,
    parseBytes32String,

    hashMessage,
    namehash,
    isValidName,
    id,

    _TypedDataEncoder,

    getAddress,
    getIcapAddress,
    getContractAddress,
    getCreate2Address,
    isAddress,

    formatVapor,
    parseVapor,

    formatUnits,
    parseUnits,

    commify,

    computeHmac,
    keccak256,
    ripemd160,
    sha256,
    sha512,

    randomBytes,
    shuffled,

    solidityPack,
    solidityKeccak256,
    soliditySha256,

    splitSignature,
    joinSignature,

    parseTransaction,
    serializeTransaction,

    getJsonWalletAddress,

    computeAddress,
    recoverAddress,

    computePublicKey,
    recoverPublicKey,

    verifyMessage,
    verifyTypedData,

    mnemonicToEntropy,
    entropyToMnemonic,
    isValidMnemonic,
    mnemonicToSeed,


    ////////////////////////
    // Enums

    SupportedAlgorithm,

    UnicodeNormalizationForm,
    Utf8ErrorReason,

    ////////////////////////
    // Types

    Bytes,
    BytesLike,
    Hexable,

    UnsignedTransaction,

    CoerceFunc,

    Indexed,

    Mnemonic,

    Deferrable,

    Utf8ErrorFunc,

    ConnectionInfo,
    OnceBlockable,
    OncePollable,
    PollOptions,
    FetchJsonResponse,

    EncryptOptions,
    ProgressCallback
}

