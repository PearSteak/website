sales_contract_address = "0xE47DdE922501091Fe600B02C50Cc4F1708AC069c";
sales_abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "bought",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "buyTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pear_",
				"type": "address"
			}
		],
		"name": "setPear",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "steak_",
				"type": "address"
			}
		],
		"name": "setSteak",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];