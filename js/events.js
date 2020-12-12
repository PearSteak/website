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

	/*
	pear_contract.contract.events.MyEvent({
		filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
		fromBlock: 0
	}, function(error, event){ console.log(event); })
	.on('data', function(event){
		console.log(event); // same results as the optional callback above
	})
	.on('changed', function(event){
		// remove event from local database
	})
	.on('error', console.error);
	*/
	
	/*
	pear_contract.contract.getPastEvents('allEvents', {
		fromBlock: 0,
		toBlock: 'latest'
	});
	*/

	pear_contract.staked({
		fromBlock: 0,
		toBlock: 'latest'
		}, function (error, result) {
        if (!error) {
			console.log(result)
		}else {
			console.log(error);
		}
    });
	
	/*
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
	*/
});

//myContract.events.MyEvent({
//    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
//    fromBlock: 0
//}, function(error, event){ console.log(event); })
//.on('data', function(event){
//    console.log(event); // same results as the optional callback above
//})
//.on('changed', function(event){
//    // remove event from local database
//})
//.on('error', console.error);