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

  describe('createCity()', function() {});

  describe('enter()', function() {});

  describe('exit()', function() {});

  describe('putCityState()', function() {});

  describe('challenge()', function() {});

  describe('getters', function() {});

  it('should provide following data', async () => {
    it('should provide city ID', async function() {});
    it('should provide host of city', async function() {});
    it('should provide participants of city', async function() {});
    it('should provide current state of city', async function() {});
    it('should provide staked amount of ether', async function() {});
    it('should provide stage #', async function() {});
  });
});
