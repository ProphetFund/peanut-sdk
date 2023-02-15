// SDK example

// import peanut from '@squirrel-labs/peanut-sdk'; // npm
import peanut from "../../index.js"; // local
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

peanut.greeting();

// config: you'll have to set these two values yourself!
const provider = new ethers.JsonRpcProvider(process.env.POKT_GOERLI_RPC);
const goerliWallet = new ethers.Wallet(process.env.TEST_WALLET_PRIVATE_KEY, goerliProvider);


// create link
const { link, txReceipt } = await peanut.createLink(
  goerliWallet,                                                 // Signer
  5,                                                            // chainId
  0.0001337,                                                    // token amount to send
  null,                                                         // token contract address (irrelevant for ether)
  0,                                                            // tokenId (only used for NFT transfers)
  'super secret password'
);
console.log(link);

// claim link
const claimTx = await peanut.claimLink(goerliWallet, link);
console.log("Claimed link. Tx hash: ", claimTx.hash);
