'use strict';
import assert from 'assert';
import { vapors } from "vapors";
import { loadTests } from "@vaporsproject/testcases";
describe('Private key generation', function () {
    let tests = loadTests('accounts');
    tests.forEach((test) => {
        if (!test.privateKey) {
            return;
        }
        it(('correctly converts private key - ' + test.name), function () {
            let wallet = new vapors.Wallet(test.privateKey);
            assert.equal(wallet.address.toLowerCase(), test.address.toLowerCase(), 'correctly computes privateKey - ' + test.privateKey);
        });
    });
});
describe('Checksum and ICAP address generation', function () {
    let tests = loadTests('accounts');
    tests.forEach((test) => {
        it(('correctly transforms address - ' + test.name), function () {
            assert.equal(vapors.utils.getAddress(test.address), test.checksumAddress, 'correctly computes checksum address from address');
            assert.equal(vapors.utils.getIcapAddress(test.address), test.icapAddress, 'correctly computes ICAP address from address');
            assert.equal(vapors.utils.getAddress(test.checksumAddress), test.checksumAddress, 'correctly computes checksum address from checksum address');
            assert.equal(vapors.utils.getIcapAddress(test.checksumAddress), test.icapAddress, 'correctly computes ICAP address from checksum address');
            assert.equal(vapors.utils.getAddress(test.icapAddress), test.checksumAddress, 'correctly computes checksum address from icap address');
            assert.equal(vapors.utils.getIcapAddress(test.icapAddress), test.icapAddress, 'correctly computes ICAP address from icap address');
        });
    });
});
//# sourceMappingURL=test-account.js.map