export const PEANUT_CONTRACTS = {
    "ethereum": {
        "mainnet": {
            "v3": "0xdB60C736A30C41D9df0081057Eae73C3eb119895"
        },
        "goerli": {
            "v1": "0x616d197A29E50EBD08a4287b26e47041286F171D",
            "v2": "0xd4964Df4dc2eb6B2fD4157DFda264AA9dd720C92",
            "v3": "0xd068b1F6F0623CbCC7ADC7545290f8991C9B8Ec9"
        }
    },
    "polygon": {
        "mainnet": {
            "v1": "0xB184b7D19d747Db9084C355b5B6a093d7063B710",
            "v2": "0x45fd48f58c47d929E9D181837fBB7Cda1974a773",
            "v3": "0xCEd763C2Ff8d5B726b8a5D480c17C24B6686837F"
        },
        "mumbai": {}
    },
    "optimism": {
        "mainnet": {
            "v1": "0x9B0817fA08b46670B92300B58AA1f4AB155701ea",
            "v3": "0x1aBe03DC4706aE47c4F2ae04EEBe5c8607c74e17"
        },
        "kovan": {}
    },
    "arbitrum": {
        "mainnet": {
            "v1": "0x8d1a17A3A4504aEB17515645BA8098f1D75237f7",
            "v3": "0x9B0817fA08b46670B92300B58AA1f4AB155701ea"
        },
        "rinkeby": {}
    },
    "xdai": {
        "mainnet": {
            "v1": "0x8d1a17A3A4504aEB17515645BA8098f1D75237f7",
            "v3": "0x897F8EDdB345F0d16081615823F76055Ad60A00c"
        },
        "testnet": {}
    },
    "bsc": {
        "mainnet": {
            "v3": "0x8d1a17A3A4504aEB17515645BA8098f1D75237f7"
        },
        "testnet": {}
    },
    "solana": {
        "mainnet": {},
        "devnet": {}
    },
    "moonbeam": {
        "mainnet": {
            "v1": "0xF5D83DF662f58255D9E9d5fe9a59ac7Cd1eF85BC"
        },
        "moonbase": {}
    },
    "avalanche": {
        "mainnet": {
            "v1": "0x8d1a17A3A4504aEB17515645BA8098f1D75237f7"
        },
        "fuji": {}
    },
    "fantom": {
        "mainnet": {},
        "testnet": {}
    },
    "harmony": {
        "mainnet": {},
        "testnet": {}
    }
}

export const PEANUT_CONTRACTS_BY_CHAIN_IDS = {
    // Ethereum
    1: {
        "v3": "0xdB60C736A30C41D9df0081057Eae73C3eb119895"
    },
    // Goerli
    5: {
        "v1": "0x616d197A29E50EBD08a4287b26e47041286F171D",
        "v2": "0xd4964Df4dc2eb6B2fD4157DFda264AA9dd720C92",
        "v3": "0xd068b1F6F0623CbCC7ADC7545290f8991C9B8Ec9"
    },
    // Polygon
    137: {
        "v1": "0xB184b7D19d747Db9084C355b5B6a093d7063B710",
        "v2": "0x45fd48f58c47d929E9D181837fBB7Cda1974a773",
        "v3": "0xCEd763C2Ff8d5B726b8a5D480c17C24B6686837F"
    },
    // Optimism
    10: {
        "v1": "0x9B0817fA08b46670B92300B58AA1f4AB155701ea",
        "v3": "0x1aBe03DC4706aE47c4F2ae04EEBe5c8607c74e17"
            },
    // Arbitrum
    42161: {
        "v1": "0x8d1a17A3A4504aEB17515645BA8098f1D75237f7",
        "v3": "0x9B0817fA08b46670B92300B58AA1f4AB155701ea"
    },
    // xDai
    100: {
        "v1": "0x8d1a17A3A4504aEB17515645BA8098f1D75237f7",
        "v3": "0x897F8EDdB345F0d16081615823F76055Ad60A00c"
    },
    // BSC
    56: {
        "v3": "0x8d1a17A3A4504aEB17515645BA8098f1D75237f7"
    },
    // Moonbeam
    1287: {
        "v1": "0xF5D83DF662f58255D9E9d5fe9a59ac7Cd1eF85BC"
    },
    // Avalanche
    43114: {
        "v1": "0x8d1a17A3A4504aEB17515645BA8098f1D75237f7"
    }
}





export const PEANUT_ABI_V3 = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "_index", "type": "uint256" }, { "indexed": false, "internalType": "uint8", "name": "_contractType", "type": "uint8" }, { "indexed": false, "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "_senderAddress", "type": "address" }], "name": "DepositEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "message", "type": "string" }], "name": "MessageEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "_index", "type": "uint256" }, { "indexed": false, "internalType": "uint8", "name": "_contractType", "type": "uint8" }, { "indexed": false, "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "_recipientAddress", "type": "address" }], "name": "WithdrawEvent", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "deposits", "outputs": [{ "internalType": "address", "name": "pubKey20", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint8", "name": "contractType", "type": "uint8" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getDepositCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_tokenAddress", "type": "address" }, { "internalType": "uint8", "name": "_contractType", "type": "uint8" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, { "internalType": "address", "name": "_pubKey20", "type": "address" }], "name": "makeDeposit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_operator", "type": "address" }, { "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "uint256[]", "name": "_ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_values", "type": "uint256[]" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "onERC1155BatchReceived", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_operator", "type": "address" }, { "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "onERC1155Received", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_operator", "type": "address" }, { "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "onERC721Received", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "_interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }, { "internalType": "address", "name": "_recipientAddress", "type": "address" }, { "internalType": "bytes32", "name": "_recipientAddressHash", "type": "bytes32" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "withdrawDeposit", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]

export const ERC20_ABI = [{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
export const ERC721_ABI = [{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
export const ERC1155_ABI = [{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];