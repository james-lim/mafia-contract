const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();
const MafiaPlasma = artifacts.require('MafiaPlasma');
const MafiaStore = artifacts.require('MafiaStore');
const MafiaFactory = artifacts.require('MafiaFactory');
const ParticipateReducer = artifacts.require('ParticipateReducer');
const { PlasmaState } = require('../sampleState');
const rlp = require('rlp');
const rlpEncode = data => '0x' + rlp.encode(data).toString('hex');

// (function(){
//   Object.prototype.isAddress = function(object){
//     const result = web3.utils.isAddress(object).should.equal(true);
//     if (result === false) {
//       throw new Error('not a valid address');
//     }
//     return object;
//   }
// })()

contract('Mafia PlasmaState', accounts => {
  const [owner, operator, user] = accounts;

  let mafiaPlasma;
  let mafiaStore;
  beforeEach(async function() {
    let deployed = await initiateChain('Mafia', operator);
    mafiaPlasma = await MafiaPlasma.at(deployed.chain);
    mafiaStore = await MafiaStore.at(deployed.store);
  });

  describe('', function() {
    it("PlasmaState['turn'].should.be.a('number')", async () => {});
    it.only("PlasmaState[`participants`].should.be.a('array of address')", async () => {
      await deployReducer(
        mafiaPlasma,
        'participate',
        ParticipateReducer.bytecode,
        operator
      );
      await dispatch(mafiaPlasma, 'participate', '0x', operator, user);
      // console.log(await mafiaStore.get('participants'))
    });
    it("PlasmaState[`role-${address}}`].should.be.a('string')", async () => {});
    it("PlasmaState[`join-${address}`].should.be.a('bool')", async () => {});
    it("PlasmaState[`alive-${address}`].should.be.a('bool')", async () => {});
    it("PlasmaState[`choice-of-citizens-${address}-${turn}`].should.be.a('address')", async () => {});
    it("PlasmaState[`suspect-for-${turn}`].should.be.a('address')", async () => {});
    it("PlasmaState[`vote-of-${address}-${turn}`].should.be.a('bool')", async () => {});
    it("PlasmaState[`choice-of-mafia-${address}-${turn}`].should.be.a('address')", async () => {});
    it("PlasmaState[`choice-of-police-${address}-${turn}`].should.be.a('address')", async () => {});
    it("PlasmaState[`choice-of-doctor-${address}-${turn}`].should.be.a('address')", async () => {});
  });
});

const initiateChain = async (appName, operator) => {
  const factory = await MafiaFactory.new(
    'V1',
    web3.utils.sha3(MafiaPlasma.bytecode),
    web3.utils.sha3(MafiaStore.bytecode)
  );
  await factory.createApp(appName, { from: operator });
  await factory.deployChain(appName, MafiaPlasma.bytecode, {
    from: operator
  });
  await factory.deployStore(appName, MafiaStore.bytecode, {
    from: operator
  });
  await factory.complete(appName, { from: operator });
  const { chain, store } = await factory.getMerklux(appName);
  return { chain, store };
};

let deployReducer = async (chain, actionName, bytecode, operator) => {
  let { actionHash, prevBlockHash, nonce } = await chain.makeAction(
    actionName,
    bytecode,
    true,
    { from: operator }
  );
  let signature = await web3.eth.sign(actionHash, operator);
  await chain.dispatch(
    actionName,
    bytecode,
    prevBlockHash,
    nonce.toNumber(),
    true,
    signature,
    { from: operator }
  );
};

let dispatch = async (chain, actionName, params, operator, user) => {
  let { actionHash, prevBlockHash, nonce } = await chain.makeAction(
    actionName,
    rlpEncode(params),
    false,
    { from: user }
  );
  let signature = await web3.eth.sign(actionHash, user);
  let result = await chain.dispatch(
    actionName,
    rlpEncode(params),
    prevBlockHash,
    nonce.toNumber(),
    false,
    signature,
    { from: operator }
  );
};
