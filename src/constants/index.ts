export const contractAddress = '0x32857298677Dc83E3Deb604D60D60075DC284C06' 
export const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "TypeOfTransaction",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "OrderID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "FromWalletAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "ToWalletAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "AmountOnToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "AmountOnUSD",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Note",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Consent",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ProductList",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "DateAndTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userID",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "TransactionHash",
				"type": "bytes32"
			}
		],
		"name": "addOrderData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "TypeOfTransaction",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "OrderID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "FromWalletAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "ToWalletAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "AmountOnToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "AmountOnUSD",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Note",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Consent",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ProductList",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "DateAndTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userID",
				"type": "uint256"
			}
		],
		"name": "transferWithData",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "transactionHash",
				"type": "bytes32"
			}
		],
		"name": "TransferWithHash",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_OrderID",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "_TransactionHash",
				"type": "bytes32"
			}
		],
		"name": "upateTransactionID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_OrderID",
				"type": "string"
			}
		],
		"name": "getOrderData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "OrderIDToIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "OrderList",
		"outputs": [
			{
				"internalType": "string",
				"name": "TypeOfTransaction",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "OrderID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "FromWalletAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "ToWalletAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "AmountOnToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "AmountOnUSD",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Note",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Consent",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ProductList",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "DateAndTime",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "TransactionHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "userID",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_OrderID",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "_TransactionHash",
				"type": "bytes32"
			}
		],
		"name": "updateAndgetdata",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]