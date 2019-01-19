const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();
const MafiaPlasma = artifacts.require('MafiaPlasma');
const MafiaStore = artifacts.require('MafiaStore');
const MafiaFactory = artifacts.require('MafiaFactory');
const ParticipateReducer = artifacts.require('ParticipateReducer');
const ConfigureReducer = artifacts.require('ConfigureReducer');
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
    it("PlasmaState[`participants`].should.be.a('array of address')", async () => {
      await deployReducer(
        mafiaPlasma,
        'participate',
        ParticipateReducer.bytecode,
        operator
      );
      await dispatch(mafiaPlasma, 'participate', '0x', operator, user);
      let encodedArray = await mafiaStore.get(web3.utils.toHex('participants'));
      let participants = rlp.decode(encodedArray);
      user
        .toLowerCase()
        .should.equal('0x' + participants[0].toString('hex').toLowerCase());
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
    context('After dispatch configure action', async () => {
      const params = [10, 12, 13, 20, 13, 18, 17];
      beforeEach(async () => {
        await deployReducer(
          mafiaPlasma,
          'configure',
          ConfigureReducer.bytecode,
          operator
        );
        await dispatch(mafiaPlasma, 'configure', params, operator, user);
      });
      it("PlasmaState[`c-init`].should.be.a('bool')", async () => {
        let encodedVal = await mafiaStore.get(web3.utils.toHex('c-init'));
        rlp
          .decode(encodedVal)
          .toString('hex')
          .should.equal('01');
      });
      it("PlasmaState[`c-stake`].should.be.a('uint')", async () => {
        let encodedVal = await mafiaStore.get(web3.utils.toHex('c-stake'));
        let val = '0x' + rlp.decode(encodedVal).toString('hex');
        web3.utils.hexToNumber(val).should.equal(params[0]);
      });
      it("PlasmaState[`c-days`].should.be.a('uint')", async () => {
        let encodedVal = await mafiaStore.get(web3.utils.toHex('c-days'));
        let val = '0x' + rlp.decode(encodedVal).toString('hex');
        web3.utils.hexToNumber(val).should.equal(params[1]);
      });
      it("PlasmaState[`c-total`].should.be.a('uint')", async () => {
        let encodedVal = await mafiaStore.get(web3.utils.toHex('c-total'));
        let val = '0x' + rlp.decode(encodedVal).toString('hex');
        web3.utils.hexToNumber(val).should.equal(params[2]);
      });
      it("PlasmaState[`c-mafia`].should.be.a('uint')", async () => {
        let encodedVal = await mafiaStore.get(web3.utils.toHex('c-mafia'));
        let val = '0x' + rlp.decode(encodedVal).toString('hex');
        web3.utils.hexToNumber(val).should.equal(params[3]);
      });
      it("PlasmaState[`c-doctor`].should.be.a('uint')", async () => {
        let encodedVal = await mafiaStore.get(web3.utils.toHex('c-doctor'));
        let val = '0x' + rlp.decode(encodedVal).toString('hex');
        web3.utils.hexToNumber(val).should.equal(params[4]);
      });
      it("PlasmaState[`c-police`].should.be.a('uint')", async () => {
        let encodedVal = await mafiaStore.get(web3.utils.toHex('c-police'));
        let val = '0x' + rlp.decode(encodedVal).toString('hex');
        web3.utils.hexToNumber(val).should.equal(params[5]);
      });
      it("PlasmaState[`c-challenge`].should.be.a('uint')", async () => {
        let encodedVal = await mafiaStore.get(web3.utils.toHex('c-challenge'));
        let val = '0x' + rlp.decode(encodedVal).toString('hex');
        web3.utils.hexToNumber(val).should.equal(params[6]);
      });
    });
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
