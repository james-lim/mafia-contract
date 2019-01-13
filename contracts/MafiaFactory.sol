pragma solidity ^0.4.24;

import "merklux/contracts/MerkluxFactory.sol";

contract MafiaFactory is MerkluxFactory {
    constructor(
        string _version,
        bytes32 _chainCode,
        bytes32 _storeCode
    ) MerkluxFactory(_version, _chainCode, _storeCode) {

    }
}
