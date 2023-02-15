# peanut-sdk
**Send tokens via cryptographically secure links**


### Install
```npm i @squirrel-labs/peanut-sdk```

or via CDN:

```<script src="https://cdn.jsdelivr.net/npm/@squirrel-labs/peanut-sdk/index.min.js"></script> ```

### Usage

Usage is as easy as:
```
import peanut from '@squirrel-labs/peanut-sdk';

// create link
const { link, txReceipt } = await peanut.createLink(
  signer,       // Signer
  5,            // chainId
  0.0001337,    // token amount to send
  null,         // token contract address (irrelevant for ether)
  0,            // tokenId (only used for NFT transfers)
  'super secret password'
);

// claim link
const claimTx = await peanut.claimLink(signer, link);
```