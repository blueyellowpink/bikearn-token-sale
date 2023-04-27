import { toast } from "react-toastify";
const ethers = require("ethers");
const Web3 = require("web3");
const testNet = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const mainNet = "https://bsc-dataseed.binance.org/";
const vestingAbi =
  require("../artifacts/contracts/PrivateVesting.sol/PrivateVesting.json").abi;
const busdAbi = require("../artifacts/contracts/RTE.sol/RTE.json").abi;
const vestingAddress = require("../bsc_mainnet_address.json");
const vestingAddressTestnet = require("../bsc_testnet_address.json");
const {
  parseEther,
  formatEther,
  UNLIMITED_ALLOWANCE,
  txUrl,
} = require("../utils");

let web3;

export const getWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
      return web3;
    } catch (error) {
      console.error(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = window.web3;
    console.log("Injected web3 detected.");
    return web3;
  } else {
    const provider = new Web3.providers.HttpProvider(mainNet);
    const web3 = new Web3(provider);
    console.log("No web3 instance injected, using Local web3.");
    return web3;
  }
};

export const getProgress = async (mode) => {
  web3 = await getWeb3();
  if (web3) {
    try {
      let vesting;
      if(mode === 'private') {
        vesting  = new web3.eth.Contract(
          vestingAbi,
          vestingAddressTestnet.privateVestingAddress
        );
      }else {
        vesting  = new web3.eth.Contract(
          vestingAbi,
          vestingAddressTestnet.publicVestingAddress
        );
      }
      const progress = await vesting.methods.progress().call();
      return formatEther(progress);
    } catch (e) {
      toast.error("Can not get progress!");
    }
  }
};

export const buyPreSale = async (amount,mode) => {
  web3 = await getWeb3();
  if (web3) {
    try {
      let vesting;
      if(mode === 'private') {
        vesting  = new web3.eth.Contract(
          vestingAbi,
          vestingAddressTestnet.privateVestingAddress
        );
      }else {
        vesting  = new web3.eth.Contract(
          vestingAbi,
          vestingAddressTestnet.publicVestingAddress
        );
      }
      const busd = new web3.eth.Contract(
        busdAbi,
        vestingAddressTestnet.busdAddress
      );

      const buyAmount = parseEther(amount);
      const accounts = await web3.eth.getAccounts();

      const allowance = await busd.methods
        .allowance(accounts[0], vesting._address)
        .call();

      if (allowance < buyAmount) {
        const busdApproval = await busd.methods
          .approve(vesting._address, buyAmount)
          .send({ from: accounts[0] });
        console.log(busdApproval);
      }
      const buy = await vesting.methods
        .buy(buyAmount.toString())
        .send({ from: accounts[0] });
      if(buy) {
        toast.success('Success!')
      }
      console.log(txUrl("bsc_testnet", buy));
    } catch (e) {
      toast.error("Buy token failed!");
      console.log(e);
    }
  }
};
export const claimPresale = async (mode) => {
  if (web3) {
    web3 = await getWeb3();
    try {
      const accounts = await web3.eth.getAccounts();
      let vesting;
      if(mode === 'private') {
        vesting  = new web3.eth.Contract(
          vestingAbi,
          vestingAddressTestnet.privateVestingV2Address
        );
      }else {
        vesting  = new web3.eth.Contract(
          vestingAbi,
          vestingAddressTestnet.publicVestingV2Address
        );
      }
      const claim = await vesting.methods.claim().send({ from: accounts[0] });
      if(claim) {
        toast.success('Claim Success!')
      }
    } catch (e) {
      toast.error("Claim failed!");
      console.log(e);
    }
  }
};
export const refundPresale = async (amount,mode) => {
  web3 = await getWeb3();
  if (web3) {
    try {
      let vesting;
      if(mode === 'private') {
        vesting  = new web3.eth.Contract(
          vestingAbi,
          vestingAddressTestnet.privateVestingAddress
        );
      }else {
        vesting  = new web3.eth.Contract(
          vestingAbi,
          vestingAddressTestnet.publicVestingAddress
        );
      }
      const busd = new web3.eth.Contract(
        busdAbi,
        vestingAddressTestnet.busdAddress
      );

      const buyAmount = parseEther(amount);
      const accounts = await web3.eth.getAccounts();

      const allowance = await busd.methods
        .allowance(accounts[0], vesting._address)
        .call();

      if (allowance < buyAmount) {
        const busdApproval = await busd.methods
          .approve(vesting._address, buyAmount)
          .send({ from: accounts[0] });
        console.log(busdApproval);
      }
      const refund = await vesting.methods
        .refund()
        .send({ from: accounts[0] });
      if(refund) {
        toast.success('Success!')
      }
      console.log(txUrl("bsc_testnet", refund));
    } catch (e) {
      toast.error("Refund token failed!");
      console.log(e);
    }
  }
};