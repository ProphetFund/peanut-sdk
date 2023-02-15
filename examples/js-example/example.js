// SDK example

// import peanut from '@squirrel-labs/peanut-sdk'; // npm
import peanut from "../../index.js"; // local
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

peanut.greeting();

// Create a signer (you'll have to do this yourself!)
const provider = new ethers.JsonRpcProvider(process.env.POKT_GOERLI_RPC);
const wallet = new ethers.Wallet(
  process.env.TEST_WALLET_PRIVATE_KEY,
  provider
);

// create link
const { link, txReceipt } = await peanut.createLink({
  signer: wallet,
  chainId: 5,
  tokenAmount: 0.0001337,
  tokenType: 0, // 0 for ether, 1 for erc20, 2 for erc721, 3 for erc1155
  password: "super_secret_password",
});
console.log(link);

// claim link
const claimTx = await peanut.claimLink({ signer: wallet, link: link });
console.log("Claimed link. Tx hash: ", claimTx.hash);
