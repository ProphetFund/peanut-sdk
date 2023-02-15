// import peanut from '@squirrel-labs/peanut-sdk'; // npm
import peanut from "../index.js"; // local
import assert from "assert";
import { ethers } from "ethers";
import dotenv from "dotenv";
import "./unit_tests.js";  // run unit tests before the live tests

// load .env file
dotenv.config();

const TEST_WALLET_PRIVATE_KEY = process.env.TEST_WALLET_PRIVATE_KEY;
const GOERLI_RPC_URL = process.env.POKT_GOERLI_RPC;
const wallet = new ethers.Wallet(
  TEST_WALLET_PRIVATE_KEY,
  new ethers.JsonRpcProvider(GOERLI_RPC_URL)
);

describe("Peanut SDK Integration Tests", function () {
  describe("create and claim BASE link on goerli", function () {
    it("should create a link and claim it", async function () {
      const goerliProvider = new ethers.JsonRpcProvider(GOERLI_RPC_URL);
      const goerliWallet = new ethers.Wallet(
        TEST_WALLET_PRIVATE_KEY,
        goerliProvider
      );

      // create link
      const { link, txReceipt } = await peanut.createLink({
        signer: goerliWallet,
        chainId: 5,
        tokenAmount: 0.0001337,
        tokenType: 0, // 0 for ether, 1 for erc20, 2 for erc721, 3 for erc1155
        password: "super_secret_password",
      });
      console.log("Created link: " + link + " with tx hash: " + txReceipt.hash);
      const claimTx = await peanut.claimLink({
        signer: goerliWallet,
        link: link,
      });
      console.log("Claimed link. Tx hash: ", claimTx.hash);
    });
  });
  describe("erc20 link", function () {
    it("should create and claim an erc20 link", async function () {
      const usdcAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"; // goerli usdc
      const usdcDecimals = 6;
      const tokenAmount = 0.01;
      const chainId = 5;

      // approve spending
      const { allowance, allowanceTx } = await peanut.approveSpendERC20(
        wallet,
        chainId,
        usdcAddress,
        tokenAmount,
        usdcDecimals
      );
      console.log("Approved spending. New allowance: ", allowance.toString());
      if (allowanceTx) {
        console.log("Approval Tx hash: ", allowanceTx.hash);
      };
      
      // create link
      const { link, linkTx } = await peanut.createLink({
        signer: wallet,
        chainId: 5,
        tokenAmount: 0.01,
        tokenAddress: usdcAddress,
        tokenType: 1, // 0 for ether, 1 for erc20, 2 for erc721, 3 for erc1155
        tokenDecimals: 6,
      });
      console.log("Created link: " + link + " with tx hash: " + linkTx.hash);
      const claimTx = await peanut.claimLink({signer: wallet, link: link});
      console.log("Claimed link. Tx hash: ", claimTx.hash);
    });
  });
});
