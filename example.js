// SDK example

import PeanutProtocol from '@squirrel-labs/peanut-sdk';

// initialize peanut
const PeanutContract = await PeanutProtocol.getContract(chain);

// create new link
const linkParameters = await PeanutContract.createLink(amount, erc20token);

const baseUrl = "https://peanut.to/claim" // they can have their own page
const link = baseUrl + linkParameters



// claim link
const claimTx = await PeanutContract.claimLink(linkParameters);