const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const MerkluxChain = artifacts.require('MerkluxChain');
const MerkluxStore = artifacts.require('MerkluxStore');
const MerkluxFactory = artifacts.require('MerkluxFactory');
const { PlasmaState } = require('../sampleState');

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
  const [owner, operator] = accounts;

  let mafiaPlasma;
  let mafiaState;
  beforeEach(async function() {
    let deployed = await initiateChain(operator);
    mafiaPlasma = await MerkluxChain.at(deployed.chain);
    mafiaState = await MerkluxStore.at(deployed.store);
  });

  describe('', function() {
    it("PlasmaState['turn'].should.be.a('number')", async () => {});
    it("PlasmaState[`participants`].should.be.a('array of address')", async () => {});
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

const initiateChain = async operator => {
  const factory = await MerkluxFactory.new(
    'V1',
    web3.utils.sha3(MerkluxChain.bytecode),
    web3.utils.sha3(MerkluxStore.bytecode)
  );
  await factory.createApp('BalanceIncreaser', { from: operator });
  await factory.deployChain('BalanceIncreaser', MerkluxChain.bytecode, {
    from: operator
  });
  await factory.deployStore('BalanceIncreaser', MerkluxStore.bytecode, {
    from: operator
  });
  await factory.complete('BalanceIncreaser', { from: operator });
  const { chain, store } = await factory.getMerklux('BalanceIncreaser');
  return { chain, store };
};
