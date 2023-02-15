////////////////// Peanut Library ///////////////////////
//
//  The intent of this library is to provide a set of stable functions to interact
//  with Peanut Protocol. Since we want others to build on top of Peanut, modularizing
//  the code will make it easier to maintain and update. We should also dogfood it internally
//  to make sure it works as intended.
//
/////////////////////////////////////////////////////////

import { ethers } from "ethers";
import assert from "assert";

// load data.js file from same directory (using import)
import {
  PEANUT_ABI_V3,
  PEANUT_CONTRACTS,
  PEANUT_CONTRACTS_BY_CHAIN_IDS,
  ERC20_ABI,
  ERC721_ABI,
  ERC1155_ABI,
} from "./data.js";
const CONTRACT_VERSION = "v3";

export function greeting() {
  console.log("Hello Peanut!");
}

export function generateKeysFromString(string) {
  /* generates a deterministic key pair from an arbitrary length string */
  var privateKey = ethers.keccak256(ethers.toUtf8Bytes(string));
  var wallet = new ethers.Wallet(privateKey);
  var publicKey = wallet.publicKey;

  return {
    address: wallet.address,
    privateKey: privateKey,
    publicKey: publicKey,
  };
}

export function hash_string(str) {
  /*
  1. convert to bytes, 2. right pad to 32 bytes, 3. hash
  */
  let hash = ethers.toUtf8Bytes(str);
  hash = ethers.hexlify(hash);
  hash = ethers.hexZeroPad(hash, 32);
  hash = ethers.keccak256(hash);
  return hash;
}

export async function signMessageWithPrivatekey(message, privateKey) {
  /* signs a message with a private key and returns the signature
      THIS SHOULD BE AN UNHASHED, UNPREFIXED MESSAGE
  */
  var signer = new ethers.Wallet(privateKey);
  return signer.signMessage(message); // this calls ethers.hashMessage and prefixes the hash
}

export function verifySignature(message, signature, address) {
  /* verifies a signature with a public key and returns true if valid */
  const messageSigner = ethers.verifyMessage(message, signature);
  return messageSigner == address;
}

export function solidityHashBytesEIP191(bytes) {
  /* adds the EIP191 prefix to a message and hashes it same as solidity*/
  // assert(bytes instanceof Uint8Array);
  return ethers.hashMessage(bytes);
}

export function solidityHashAddress(address) {
  /* hashes an address to a 32 byte hex string */
  // return ethers.solidityKeccak256(["address"], [address]); // no longer exists in ethers v6
  return ethers.solidityPackedKeccak256(["address"], [address]);
}

export async function signAddress(string, privateKey) {
  // 1. hash plain address
  const stringHash = ethers.solidityPackedKeccak256(["address"], [string]);
  const stringHashbinary = ethers.getBytes(stringHash);

  // 2. add eth msg prefix, then hash, then sign
  var signer = new ethers.Wallet(privateKey);
  var signature = await signer.signMessage(stringHashbinary); // this calls ethers.hashMessage and prefixes the hash
  return signature;
}

function getRandomString(length) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result_str = "";
  for (let i = 0; i < length; i++) {
    result_str += chars[Math.floor(Math.random() * chars.length)];
  }
  return result_str;
}

export async function getContract(chainId, signer) {
  /* returns a contract object for the given chainId and signer */
  if (typeof chainId == "string") {
    // if chainId is a string, convert to int
    chainId = parseInt(chainId);
  }
  const contractAddress =
    PEANUT_CONTRACTS_BY_CHAIN_IDS[chainId][CONTRACT_VERSION];
  const contract = new ethers.Contract(contractAddress, PEANUT_ABI_V3, signer);
  return contract;
  // TODO: return class
}

export function getParamsFromLink(link) {
  /* returns the parameters from a link */
  const url = new URL(link);
  const params = new URLSearchParams(url.search);
  const chainId = params.get("c"); // can be chain name or chain id
  const contractVersion = params.get("v");
  const depositIdx = params.get("i");
  const password = params.get("p");
  let trackId = "" // optional
  if (params.get("t")) {
    trackId = params.get("t");
  }
  return { chainId, contractVersion, depositIdx, password, trackId };
}

export function getParamsFromPageURL() {
  /* returns the parameters from the current page url */
  const params = new URLSearchParams(window.location.search);
  const chainId = params.get("c"); // can be chain name or chain id
  const contractVersion = params.get("v");
  const depositIdx = params.get("i");
  const password = params.get("p");

  return { chainId, contractVersion, depositIdx, password };
}

export function getLinkFromParams(
  chainId,
  contractVersion,
  depositIdx,
  password,
  baseUrl = "https://peanut.to/claim",
  trackId = ""
) {
  /* returns a link from the given parameters */
  const link =
    baseUrl +
    "?c=" +
    chainId +
    "&v=" +
    contractVersion +
    "&i=" +
    depositIdx +
    "&p=" +
    password;

  if (trackId != "") {
    return link + "&t=" + trackId;
  }
  return link;
}

export async function approveSpendERC20(
  signer,
  chainId,
  tokenAddress,
  amount,
  tokenDecimals
) {
  /*  Approves the contract to spend the specified amount of tokens   */
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  if (amount == -1) {
    // if amount is -1, approve infinite amount
    amount = ethers.MaxUint256;
  }
  const spender = PEANUT_CONTRACTS_BY_CHAIN_IDS[chainId][CONTRACT_VERSION];
  let allowance = await tokenContract.allowance(signer.address, spender);
  // convert amount to BigInt and compare to allowance
  amount = ethers.parseUnits(amount.toString(), tokenDecimals);
  if (allowance >= amount) {
    console.log("Allowance already enough, no need to approve more");
    return { allowance, txReceipt: null };
  } else {
    const tx = await tokenContract.approve(spender, amount);
    const txReceipt = await tx.wait();
    let allowance = await tokenContract.allowance(signer.address, spender);
    return { allowance, txReceipt };
  }
}


export function getDepositIdx(txReceipt) {
  /* returns the deposit index from a tx receipt */
  const logs = txReceipt.logs;
  const chainId = txReceipt.chainId;
  var depositIdx;
  if (chainId == 137) {
    depositIdx = logs[logs.length - 2].args[0];
  } else {
    // get last log a
    depositIdx = logs[logs.length - 1].args[0];
  }
  return depositIdx;
}

export async function createLink({
  signer, // ethers signer object
  chainId, // chain id of the network (only EVM for now)
  tokenAmount, // amount of the token to send
  tokenAddress = "0x0000000000000000000000000000000000000000",
  tokenType = 0, // 0: ETH, 1: ERC20, 2: ERC721, 3: ERC1155
  tokenId = 0, // only used for ERC721 and ERC1155
  tokenDecimals = 18, // only used for ERC20 and ERC1155
  password = "", // password to claim the link
  baseUrl = "https://peanut.to/claim",
  trackId = "sdk", // optional tracker id to track the link source
}) {
  /* creates a link with redeemable tokens */

  assert(signer, "signer arg is required");
  assert(chainId, "chainId arg is required");
  assert(tokenAmount, "amount arg is required");

  let txOptions = {};
  // For base tokens, we need to send the amount as value
  if (tokenType == 0) {
    // convert tokenAmount to string and parse it to ether
    tokenAmount = ethers.parseUnits(tokenAmount.toString(), "ether");
    txOptions = { value: tokenAmount };
  }
  // for erc20 and erc1155, we need to convert tokenAmount to appropriate decimals
  else if (tokenType == 1 || tokenType == 3) {
    tokenAmount = ethers.parseUnits(tokenAmount.toString(), tokenDecimals);
  }

  if (password == null || password == "") {
    // if no password is provided, generate a random one
    password = getRandomString(16);
  }
  const keys = generateKeysFromString(password); // deterministically generate keys from password
  const contract = await getContract(chainId, signer);

  var tx = await contract.makeDeposit(
    tokenAddress,
    tokenType,
    BigInt(tokenAmount),
    tokenId,
    keys.address,
    txOptions
  );

  // now we need the deposit index from the tx receipt
  var txReceipt = await tx.wait();
  var depositIdx = getDepositIdx(txReceipt);

  // now we can create the link
  const link = getLinkFromParams(
    chainId,
    CONTRACT_VERSION,
    depositIdx,
    password,
    baseUrl,
    trackId
  );
  // return the link and the tx receipt
  return { link, txReceipt };
}

export async function claimLink({ signer, link, recipient = null }) {
  /* claims the contents of a link */
  assert(signer, "signer arg is required");
  assert(link, "link arg is required");

  const params = getParamsFromLink(link);
  const chainId = params.chainId;
  const contractVersion = params.contractVersion;
  const depositIdx = params.depositIdx;
  const password = params.password;
  if (recipient == null) {
    recipient = signer.address;
  }
  const keys = generateKeysFromString(password); // deterministically generate keys from password
  const contract = await getContract(chainId, signer);

  // cryptography
  var addressHash = solidityHashAddress(recipient);
  var addressHashBinary = ethers.getBytes(addressHash);
  var addressHashEIP191 = solidityHashBytesEIP191(addressHashBinary);
  var signature = await signAddress(recipient, keys.privateKey); // sign with link keys

  // withdraw the deposit
  // address hash is hash(prefix + hash(address))
  const tx = await contract.withdrawDeposit(
    depositIdx,
    recipient,
    addressHashEIP191,
    signature
  );
  const txReceipt = await tx.wait();

  return txReceipt;
}

// export object with all functions
export default {
  greeting,
  generateKeysFromString,
  signMessageWithPrivatekey,
  verifySignature,
  solidityHashBytesEIP191,
  solidityHashAddress,
  signAddress,
  getRandomString,
  getContract,
  getDepositIdx,
  getParamsFromLink,
  getParamsFromPageURL,
  getLinkFromParams,
  createLink,
  claimLink,
  approveSpendERC20,
  // approveSpendERC721,
  // approveSpendERC1155,
};
