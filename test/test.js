// import peanut from '@squirrel-labs/peanut-sdk'; // npm
import peanut from "../index.js"; // local
import assert from "assert";
import { ethers } from "ethers";
import dotenv from "dotenv";

// load .env file
dotenv.config();

peanut.greeting();

// actual tests
// greeting,
// generateKeysFromString,
// signMessageWithPrivatekey,
// verifySignature,
// solidityHashBytesEIP191,
// solidityHashAddress,
// signAddress,
// getRandomString,
// getContract,
// getDepositIdx,
// getParamsFromLink,
// getParamsFromPageURL,
// getLinkFromParams,
// createLink,
// claimLink,
const TEST_WALLET_PRIVATE_KEY = process.env.TEST_WALLET_PRIVATE_KEY;
const GOERLI_RPC_URL = process.env.POKT_GOERLI_RPC;
const wallet = new ethers.Wallet(TEST_WALLET_PRIVATE_KEY);

describe("Peanut SDK", function () {
  // generateKeysFromString should always return the same keys for the same string
  describe("generateKeysFromString()", function () {
    it("should generate deterministic keys", function () {
      const keys1 = peanut.generateKeysFromString("test");
      const keys2 = peanut.generateKeysFromString("test");
      assert.equal(keys1.address, keys2.address);
      assert.equal(keys1.privateKey, keys2.privateKey);
      assert.equal(keys1.publicKey, keys2.publicKey);
    });
  });

  // test wallet from private key should have address 0xaBC5211D86a01c2dD50797ba7B5b32e3C1167F9f
  describe("test wallet from private key", function () {
    it("should have address 0xaBC5211D86a01c2dD50797ba7B5b32e3C1167F9f", function () {
      assert.equal(
        wallet.address,
        "0xaBC5211D86a01c2dD50797ba7B5b32e3C1167F9f"
      );
    });
  });

  // signMessageWithPrivatekey should produce the same signature for the same message and private key
  describe("signMessageWithPrivatekey()", function () {
    it("should produce the same signature for the same message and private key", async function () {
      const message = "test";
      const signature1 = await peanut.signMessageWithPrivatekey(
        message,
        TEST_WALLET_PRIVATE_KEY
      );
      const signature2 = await peanut.signMessageWithPrivatekey(
        message,
        TEST_WALLET_PRIVATE_KEY
      );
      assert.equal(signature1, signature2);

      // assert that the signature is valid
      const validSignature1 = peanut.verifySignature(
        message,
        signature1,
        wallet.address
      );
      assert.equal(validSignature1, true);

      // generate some new keys from random string
      const keys1 = peanut.generateKeysFromString(peanut.getRandomString(16));

      // sign a message with the private key
      const randomMessage = peanut.getRandomString(16);
      const signature3 = await peanut.signMessageWithPrivatekey(
        randomMessage,
        keys1.privateKey
      );
      const signature4 = await peanut.signMessageWithPrivatekey(
        randomMessage,
        keys1.privateKey
      );

      // assert that the signatures are the same
      assert.equal(signature3, signature4);

      // assert that the signatures are valid
      const validSignature3 = peanut.verifySignature(
        randomMessage,
        signature3,
        keys1.address
      );
      assert.equal(validSignature3, true);
    });
    it("should produce a different signature for a different message and the same private key", async function () {
      const message1 = "test";
      const message2 = "test2";
      const signature1 = await peanut.signMessageWithPrivatekey(
        message1,
        TEST_WALLET_PRIVATE_KEY
      );
      const signature2 = await peanut.signMessageWithPrivatekey(
        message2,
        TEST_WALLET_PRIVATE_KEY
      );
      assert.notEqual(signature1, signature2);
    });
  });

  describe("Integration Test: create and claim BASE link on goerli", function () {
    it("should create a link and claim it", async function () {
      const goerliProvider = new ethers.JsonRpcProvider(GOERLI_RPC_URL);
      const goerliWallet = new ethers.Wallet(
        TEST_WALLET_PRIVATE_KEY,
        goerliProvider
      );

      const linkValue = 0.001337 * 1e18;

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

      const claimTx = await peanut.claimLink(goerliWallet, link);
      console.log(claimTx);

        console.log("Claimed link. Tx hash: ", claimTx.hash);      
    });
  });
});
