import "merklux/contracts/MerkluxReducer.sol";

contract ConfigureReducer is MerkluxReducer {
    function reduce(
        IStateTree _tree,
        address _from,
        bytes _encodedParams
    ) public returns (
        bytes memory _encodedPairs
    ) {
        // Read stored values
        bytes memory _encodedParticipants = _tree.read('c-init');
        require(_encodedParticipants.length == 0, "Already configured");

        // Decode data with RLP decoder
        RLPReader.RLPItem[] memory configs = _encodedParams.toRlpItem().toList();

        // encode the array of bytes to bytes
        ReducerUtil.RlpData memory pairsToReturn;
        pairsToReturn = pairsToReturn.addBool('c-init', true);
        pairsToReturn = pairsToReturn.addUint('c-stake', configs[0].toUint());
        pairsToReturn = pairsToReturn.addUint('c-days', configs[1].toUint());
        pairsToReturn = pairsToReturn.addUint('c-total', configs[2].toUint());
        pairsToReturn = pairsToReturn.addUint('c-mafia', configs[3].toUint());
        pairsToReturn = pairsToReturn.addUint('c-doctor', configs[4].toUint());
        pairsToReturn = pairsToReturn.addUint('c-police', configs[5].toUint());
        pairsToReturn = pairsToReturn.addUint('c-challenge', configs[6].toUint());
        return pairsToReturn.encode();
    }
}
