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

	pear_contract.staked({}, function (error, result) {
        if (!error) {
			console.log(result)
		}else {
			console.log(error);
		}
    });
	
	steak_contract.staked({}, function (error, result) {
        if (!error) {
			console.log(result)
		}else {
			console.log(error);
		}
    });
	
	pear_contract.unstaked({}, function (error, result) {
        if (!error) {
			console.log(result)
		}else {
			console.log(error);
		}
    });
	
	steak_contract.unstaked({}, function (error, result) {
        if (!error) {
			console.log(result)
		}else {
			console.log(error);
		}
    });
});