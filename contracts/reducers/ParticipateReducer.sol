pragma solidity ^0.4.24;

contract ParticipateReducer {
    function reduce(
        IStateTree _tree,
        address _from,
        bytes _encodedParams
    ) public returns (
        bytes memory _encodedPairs
    ) {
        // 1. Read param
        address user = _encodedParams.toRlpItem().toAddress();

        // 2. Read stored values
        RLPItem[] memory encodedAddress = _tree.get('participants').toRlpItem().toList();

        // 3. calculate
        bytes[] participants = new bytes[](encodedAddress.length + 1);
        for (uint i = 0; i < participants.length; i++) {
           if (i < participants.length - 1) {
              participants[i] = encodedAddress.toBytes();
              require(participants[i] != abi.encodePacked(user));
           } else {
              participants[i] = abi.encodePacked(user);
           }
        }

        // 4. encode
        ReducerUtil.RlpData memory pairsToReturn;
        pairsToReturn = pairsToReturn.addBytes('participants', participants.encodeList());
        return pairsToReturn.encode();
    }
  }
