window.addEventListener('load', () => {
	if(typeof(web3) === 'undefined') {
		return console.log("Metamask is not installed");
	}
	
	var account =
	web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
		? web3.eth.accounts[0]
		: '0x0000000000000000000000000000000000000001';
		
	pear_contract = web3.eth.contract(pear_abi).at(pear_contract_address);
	steak_contract = web3.eth.contract(steak_abi).at(steak_contract_address);
});

if (window.ethereum !== undefined) {
	window.ethereum.enable();
};

function pear_mint() {
	var addresses = $("#pear_addresses").val().split(",");
	var amount = $("#pear_amount").val();
	pear_contract.mintToMultipleAddresses(addresses, amount, function(error, info) {
		if (!error) {
			console.log(info);
		} else {
			console.log(error);
		}
	});
}

function steak_mint() {
	var addresses = $("#steak_addresses").val().split(",");
	var amount = $("#steak_amount").val();
	steak_contract.mintToMultipleAddresses(addresses, amount, function(error, info) {
		if (!error) {
			console.log(info);
		} else {
			console.log(error);
		}
	});
}