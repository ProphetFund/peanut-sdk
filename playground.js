import peanut from "./index.js"; // local
import assert from "assert";
import { ethers } from "ethers";
import dotenv from "dotenv";

// load .env file
dotenv.config();

const TEST_WALLET_PRIVATE_KEY = process.env.TEST_WALLET_PRIVATE_KEY;
const GOERLI_RPC_URL = process.env.POKT_GOERLI_RPC;
const wallet = new ethers.Wallet(
  TEST_WALLET_PRIVATE_KEY,
  new ethers.JsonRpcProvider(GOERLI_RPC_URL)
);

const usdcAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"; // goerli usdc
const usdcDecimals = 6;
const tokenAmount = 0.01;
const chainId = 5;

console.log(
  "Creating erc20 link with token amount: " +
    tokenAmount +
    " and token address: " +
    usdcAddress
);

// approve spending
const { allowance, allowanceTx } = await peanut.approveSpendERC20(
  wallet,
  chainId,
  usdcAddress,
  tokenAmount,
  usdcDecimals
);
console.log("Current allowance: ", allowance.toString());
if (allowanceTx) {
  console.log("Approval Tx hash: ", allowanceTx.hash);
}

// create link
const { link, linkTx } = await peanut.createLink({
  signer: wallet,
  chainId: 5,
  tokenAmount: 0.01,
  tokenAddress: usdcAddress,
  tokenType: 1, // 0 for ether, 1 for erc20, 2 for erc721, 3 for erc1155
  tokenDecimals: 6,
});
console.log("Created link: " + link);
if (linkTx) {
  console.log("Link creation tx hash: " + linkTx.hash);
}
const claimTx = await peanut.claimLink({ signer: wallet, link: link });
console.log("Claimed link. Tx hash: ", claimTx.hash);

// const usdcAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
// const usdcDecimals = 6;
// const tokenAmount = 0.01;
// const chainId = 5;

// // approve spending
// const {allowance, allowanceTx} = await peanut.approveSpendERC20(
//     wallet,
//     chainId,
//     usdcAddress,
//     tokenAmount,
//     usdcDecimals
// )
// console.log("Approved spending. New allowance: ", allowance.toString());
// try {
//     console.log("Approval Tx hash: ", allowanceTx.hash);
// } catch (e) {
//     console.log("Approval Tx hash: ", allowanceTx);
// }

// // create link
// const { link, linkTx } = await peanut.createLink(
//     wallet,                 // Signer
//     5,                      // chainId
//     0.01,                   // token amount to send
//     usdcAddress,            // token contract address (irrelevant for ether)
//     1,                      // tokentype (1 for erc20)
//     0,                      // tokenId (only used for NFT transfers)
//     6,                      // tokenDecimals
// );
// console.log(link);
// const claimTx = await peanut.claimLink(wallet, link);
// console.log("Claimed link. Tx hash: ", claimTx.hash);
