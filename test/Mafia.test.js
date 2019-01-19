const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Mafia = artifacts.require('IMafia');

contract('Mafia', accounts => {
  const [owner] = accounts;

  beforeEach(async function() {
    this.mafia = await Mafia.new({ from: owner });
  });

  describe('createCity()', function() {
    it('should push a City struct object into the cities array', async () => {});
    it('should take Ethers as a stake', async () => {});
    it('should take configuration as a parameter', async () => {
      it('should configure the minimum amount of stake', async () => {});
      it('should configure the maximum days of a game', async () => {});
      it('should configure the seconds per stage', async () => {});
      it('should configure the number of mafias', async () => {});
      it('should configure the number of doctors', async () => {});
      it('should configure the number of citizens', async () => {});
      it('should configure the number of police officers', async () => {});
      it('should configure challenge period after the end of the game', async () => {});
    });
  });

  describe('enter()', function() {
    it('should take Ethers as a participation fee', async () => {});
    it('should put sender address into a list which is stored in mapping(uint=>address[])', async () => {});
    it('should revert enter request when it exceeds the limit of participants', async () => {});
  });

  describe('exit()', function() {
    it('should revert during its challenge period', async () => {});
    it('should revert when the root hash does not have a merkle proof for the end of the game', async () => {});
    it('should transfer designated amount of Ethers if there is a mekrle proof for the claim', async () => {});
  });

  describe('putCityState()', function() {
    it('should be executed only by the city creator', async () => {});
    it('should store given hash value into a list which is stored in mapping(uint=>bytes32[])', async () => {});
  });

  describe('challenge()', function() {
    it('should revert when its not in the challenge period', async () => {});
    it('should open a Merklux case to prove its innocence', async () => {});
    it('should slash the Ethers of city creator when failed to defend the case', async () => {});
    it('should allow claim of Ethers when its slashing condition', async () => {});
  });

  it('should provide following data', async () => {
    it('should provide city ID', async function() {});
    it('should provide host of city', async function() {});
    it('should provide participants of city', async function() {});
    it('should provide current state of city', async function() {});
    it('should provide staked amount of ether', async function() {});
    it('should provide stage #', async function() {});
  });
});
