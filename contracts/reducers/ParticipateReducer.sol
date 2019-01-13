pragma solidity ^0.4.24;

import "merklux/contracts/MerkluxReducer.sol";

contract ParticipateReducer is MerkluxReducer {
    function reduce(
        IStateTree _tree,
        address _from,
        bytes _encodedParams
    ) public returns (
        bytes memory _encodedPairs
    ) {
        // Read stored values
        bytes memory _encodedParticipants = _tree.read('participants');

        // Declare an array of address for participants
        address[] memory participants;

        if (_encodedParticipants.length == 0) {
            // When a stored value is null
            participants = new address[](1);
            participants[0] = _from;
        } else {
            // When a stored value is non-null, convert stored value to rlp item
            RLPReader.RLPItem[] memory encodedAddress = _encodedParticipants.toRlpItem().toList();
            participants = new address[](encodedAddress.length + 1);
            for (uint i = 0; i < participants.length; i++) {
                if (i < participants.length - 1) {
                    participants[i] = encodedAddress[i].toAddress();
                    require(participants[i] != _from);
                } else {
                    participants[i] = _from;
                }
            }
        }

        // enocde address array to bytes array
        bytes[] memory bytesToEncode = new bytes[](participants.length);
        for (i = 0; i < participants.length; i++) {
            bytesToEncode[i] = RLPEncode.encodeAddress(participants[i]);
        }

        // encode the array of bytes to bytes
        ReducerUtil.RlpData memory pairsToReturn;
        pairsToReturn = pairsToReturn.addBytes('participants', RLPEncode.encodeList(bytesToEncode));
        return pairsToReturn.encode();
    }
}
