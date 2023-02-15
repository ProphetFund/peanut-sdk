# peanut-sdk
The Peanut Protocol SDK! Send tokens via cryptographically secure links

As easy as
```
import peanut from '@squirrel-labs/peanut-sdk';

// create link
const { link, txReceipt } = await peanut.createLink(
  goerliWallet, // Signer
  5,            // chainId
  0.0001337,    // token amount to send
  null,         // token contract address (irrelevant for ether)
  0,            // tokenId (only used for NFT transfers)
  'super secret password'
);

// claim link
const claimTx = await peanut.claimLink(goerliWallet, link);
```