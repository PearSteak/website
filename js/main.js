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
	
	setInterval(updatePearTotalSupply, 10000);
	updatePearTotalSupply();
	setInterval(updateSteakTotalSupply, 10000);
	updateSteakTotalSupply();
	
	updatePearBalance();
	updateSteakBalance();
	
	setInterval(updatePearStakeList, 10000);
	updatePearStakeList();
	setInterval(updateSteakStakeList, 10000);
	updateSteakStakeList();
	
	$(".pear_contract").text(pear_contract_address);
	$(".steak_contract").text(steak_contract_address);
});

if (window.ethereum !== undefined) {
	window.ethereum.enable();
};

function updatePearTotalSupply() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
			
	pear_contract.getTotalSupply.call(function(error, info) {
		if (!error) {
			$(".pearTotalSupply_num").text((info/1000000000000000000).toFixed(2));
		} else {
			console.log(error);
		}
	});	
};

function updateSteakTotalSupply() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
			
	steak_contract.getTotalSupply.call(function(error, info) {
		if (!error) {
			$(".steakTotalSupply_num").text((info/1000000000000000000).toFixed(2));
		} else {
			console.log(error);
		}
	});
};

function updatePearBalance() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
			
	pear_contract.getMyBalance.call(function(error, info) {
		if (!error) {
			var num = info;
			num = num.replace(/(\d)(?=(\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d)+(?!\d))/g, "$1.");
			$(".pear-amount").val(num.toFixed(2));
			structurePearBalance()
		} else {
			console.log(error);
		}
	});
};

function updateSteakBalance() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
			
	steak_contract.getMyBalance.call(function(error, info) {
		if (!error) {
			$(".steak-amount").val(info);
		} else {
			console.log(error);
		}
	});
};

function PearStake() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
	
	var stake_option = $(".pear-dropdown").val();
	var stake_amount = $(".pear-amount").val();
	pear_contract.stake(stake_amount, stake_option, function(error, hash) {
		if (!error) {
			console.log(hash);
		} else {
			console.log(error);
		}
	});
};

function SteakStake() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
	
	var stake_option = $(".steak-dropdown").val();
	var stake_amount = $(".steak-amount").val();
	steak_contract.stake(stake_amount, stake_option, function(error, hash) {
		if (!error) {
			console.log(hash);
		} else {
			console.log(error);
		}
	});
};

function updatePearStakeList() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
			
	pear_contract.getStakes.call(function(error, info) {
		if (!error) {
			console.log(info);
		} else {
			console.log(error);
		}
	});
};

function updateSteakStakeList() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
	
	
	steak_contract.getStakes.call(function(error, info) {
		if (!error) {
			console.log(info);
		} else {
			console.log(error);
		}
	});
};

$(function(){
	$(".pear-flexible").click(function(){
		$(".pear-dropdown").html("Flexible <span class=\"caret\"></span>");
		$(".pear-dropdown").val(0);
	});
	$(".pear-7days").click(function(){
		$(".pear-dropdown").html("7-days <span class=\"caret\"></span>");
		$(".pear-dropdown").val(1);
	});
	$(".pear-30days").click(function(){
		$(".pear-dropdown").html("30-days <span class=\"caret\"></span>");
		$(".pear-dropdown").val(2);
	});
	$(".pear-365days").click(function(){
		$(".pear-dropdown").html("365-days <span class=\"caret\"></span>");
		$(".pear-dropdown").val(3);
	});
	
	$(".steak-flexible").click(function(){
		$(".steak-dropdown").html("Flexible <span class=\"caret\"></span>");
		$(".steak-dropdown").val(0);
	});
	$(".steak-7days").click(function(){
		$(".steak-dropdown").html("7-days <span class=\"caret\"></span>");
		$(".steak-dropdown").val(1);
	});
	$(".steak-30days").click(function(){
		$(".steak-dropdown").html("30-days <span class=\"caret\"></span>");
		$(".steak-dropdown").val(2);
	});
	$(".steak-365days").click(function(){
		$(".steak-dropdown").html("365-days <span class=\"caret\"></span>");
		$(".steak-dropdown").val(3);
	});
});