// SDK example

// import peanut from '@squirrel-labs/peanut-sdk'; // npm
import peanut from "../../index.js"; // local
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

peanut.greeting();

const GOERLI_RPC_URL = process.env.POKT_GOERLI_RPC;
const TEST_WALLET_PRIVATE_KEY = process.env.TEST_WALLET_PRIVATE_KEY;
const goerliProvider = new ethers.JsonRpcProvider(GOERLI_RPC_URL);
const goerliWallet = new ethers.Wallet(TEST_WALLET_PRIVATE_KEY, goerliProvider);

const linkValue = 0.0001337;

// create link
const { link, txReceipt } = await peanut.createLink(
  goerliWallet,
  5,
  linkValue,
  null,
  0,
  0,
  null
);
console.log("Created link: " + link + " with tx hash: " + txReceipt.hash);

// claim link
const claimTx = await peanut.claimLink(goerliWallet, link);
console.log("Claimed link. Tx hash: ", claimTx.hash);

