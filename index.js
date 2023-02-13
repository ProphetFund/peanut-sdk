////////////////// Peanut Library ///////////////////////
//
//  The intent of this library is to provide a set of stable functions to interact
//  with Peanut Protocol. Since we want others to build on top of Peanut, modularizing
//  the code will make it easier to maintain and update. We should also dogfood it internally
//  to make sure it works as intended.
//
/////////////////////////////////////////////////////////


import { ethers } from "ethers";

// load data.js file from same directory (using import)
import { PEANUT_ABI_V3, PEANUT_CONTRACTS, PEANUT_CONTRACTS_BY_CHAIN_IDS } from './data.js';

CONTRACT_VERSION = "v3";

export function printMsg() {
    console.log("This is a message from the demo package");
  }


export function generateKeysFromString(string) {
  /* generates a deterministic key pair from an arbitrary length string */
  var privateKey = ethers.keccak256(ethers.toUtf8Bytes(string));
  var wallet = new ethers.Wallet(privateKey);
  var publicKey = wallet.publicKey;

  return { address: wallet.address, privateKey: privateKey, publicKey: publicKey };
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
  return signer.signMessage(message);  // this calls ethers.hashMessage and prefixes the hash
}


export function verifySignature(message, signature, address) {
  /* verifies a signature with a public key and returns true if valid */
  const messageSigner = ethers.verifyMessage(message, signature);
  return messageSigner == address;
}


export function solidityHashBytesEIP191(bytes) {
  // assert input is Uint8Array
  assert(bytes instanceof Uint8Array);
  return ethers.hashMessage(bytes);
}

export function solidityHashAddress(address) {
  /* hashes an address to a 32 byte hex string */
  return ethers.solidityKeccak256(["address"], [address]);
}


export async function signAddress(string, privateKey) {
  // assert string is an address (starts with 0x and is 42 chars long)
  assert(string.startsWith("0x") && string.length == 42, "String is not an address");

  /// 1. hash plain address
  const stringHash = ethers.solidityKeccak256(["address"], [string]);
  const stringHashbinary = ethers.arrayify(stringHash);

  /// 2. add eth msg prefix, then hash, then sign
  var signer = new ethers.Wallet(privateKey);
  var signature = await signer.signMessage(stringHashbinary);  // this calls ethers.hashMessage and prefixes the hash
  return signature;
}


export async function getContract(chainId, signer) {
  /* returns a contract object for the given chainId and signer */
  const contractAddress = PEANUT_CONTRACTS_BY_CHAIN_IDS[chainId][CONTRACT_VERSION];
  const contract = new ethers.Contract(contractAddress, PEANUT_ABI_V3, signer);
  return contract;
  // TODO: return class
}

export async function createLink(chainId, amount, contractAddress=null, linkType="0") {
  /* creates a link to claim a peanut
        chainId: chain id of the network (only EVM for now)
        amount: amount of peanuts to claim
        contractAddress: address of the token to claim
        linkType: type of link (0: ETH, 1: ERC20, 2: ERC721, 3: ERC1155)
  */

  const contract = await getContract(chainId, signer);

  // ...
}

  




// export object with all functions
export default {
  printMsg,
  generateKeysFromString,
  hash_string,
  signMessageWithPrivatekey,
  verifySignature,
  solidityHashBytesEIP191,
  solidityHashAddress,
  signAddress,
  getContract,
  createLink,
  claimLink,
  PeanutContract
};
