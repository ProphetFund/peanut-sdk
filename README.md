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
const { link, txReceipt } = await peanut.createLink({
  signer: wallet,
  chainId: 5,
  tokenAmount: 0.0001337,
  tokenType: 0, // 0 for ether, 1 for erc20, 2 for erc721, 3 for erc1155
  password: "super_secret_password",
});

// claim link
const claimTx = await peanut.claimLink({ signer: wallet, link: link });
```