/////////////////////////////////////////////////////////
//
// Generating a deposit link
//
// How to send $ using a trustless link
//
/////////////////////////////////////////////////////////

// lets make a simple eth deposit!
async function makeSampleDeposit(Signer, amount, chain) {
    const contractType = 0;  // 0 for eth, 1 for erc20, 2 for erc721, 3 for erc1155
    const tx_options = {
        value: ethers.utils.parseEther(amount),
    };

    // IMPORTANT: generate private public key pair deterministically from a string with sufficient entropy
    const password = "securePassword123";
    const keys = generateKeysFromString(password);

    // these values are unnecessary for eth deposits, but we set them to 0 for clarity
    const tokenId = 0;
    const tokenAddress = ethers.constants.AddressZero;
    const amount = ethers.utils.parseEther("0");

    // get the contract instance
    const contract = new ethers.Contract(
        PEANUT_CONTRACTS[chain][subchain]["v3"],
        PEANUT_ABI_V3,
        Signer, // you'll need to pass in a signer here
    );

    // make the deposit!
    var tx = await contract.makeDeposit(
        tokenAddress,
        contractType,
        tokenAmount,
        tokenId,
        keys.address,
        tx_options
    );

    // now we need the deposit index from the tx receipt
    var txReceipt = await tx.wait();
    var events = txReceipt.events;
    if (chain == "polygon") {
        var depositIndex = events[events.length - 2].args[0]["_hex"];
        // var depositIndex = events[1].args[2]["_hex"];
    } else {
        var depositIndex = events[events.length - 1].args[0]["_hex"];
        // var depositIndex = events[0].args[2]["_hex"];
    }
    const depositIndex = parseInt(depositIndex, 16);

    // now that we have the deposit index, we are finally ready to generate the link!
    const baseUrl = 'https://peanut.to/claim';
    // you can also use an endpoint on your own server to claim the deposit, or use the (COMING SOON) IPFS dApp
    // params = f"?c={chain_idx}&v={deposit_details['contract_version']}&i={deposit_details['deposit_index']}&p={deposit_details['password']}"
    const link = baseUrl + '?c=' + chain + '&v=3' + '&i=' + depositIndex + '&p=' + password
    console.log(link);
    return link;

    // And that's it! The user can now send the trustless link to his frens!
}


/////////////////////////////////////////////////////////
//
// Claiming a deposit
//
// Coming soon! Tutorial will be out by Jan 28th
//
/////////////////////////////////////////////////////////

// functions we'll need for the second part of the tutorial:
