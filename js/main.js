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
	
	setInterval(updateTotalSupply, 10000);
	updateTotalSupply();
	
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

function updateTotalSupply() {
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
	
	steak_contract.getTotalSupply.call(function(error, info) {
		if (!error) {
			$(".steakTotalSupply_num").text((info/1000000000000000000).toFixed(2));
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
			
	pear_contract.getAmountOfStakes.call(function(error, info) {
		if (!error) {
			var amountOfStakes = info["c"][0];
			if ($( "#pear_stake_table tr").length != amountOfStakes) {
				$("#pear_stake_table").empty();
				for (i = 0; i < amountOfStakes; i++) {
					console.log(i);
					$( "#pear_stake_table" ).append('<tr>' +
							'<td class="pear_steak_amount_' + i + '"></td>' +
							'<td class="pear_steak_remaining_' + i + '"></td>' +
							'<td class="pear_steak_reward_' + i + '"></td>' +
							'<td><button type="button" onclick="unstake();" class="btn btn-success btn-sm unstake-button pear_steak_button_' + i + '" disabled>Unstake!</button></td>' +
						'</tr>');
				}
			}
			for (y = 0; y < amountOfStakes; y++) {
				console.log(y);
				pear_contract.getStakeAmount.call(y, function(error, info) {
					if (!error) {
						$( ".pear_steak_amount_" + y ).text((info/1000000000000000000).toFixed(2));
					} else {
						console.log(error);
					}
				});
				pear_contract.getRemainingLockTime.call(y, function(error, info) {
					if (!error) {
						$( ".pear_steak_remaining_" + y ).text(info);
					} else {
						console.log(error);
					}
				});
				pear_contract.getStakeReward.call(y, function(error, info) {
					if (!error) {
						$( ".pear_steak_reward_" + y ).text(info);
					} else {
						console.log(error);
					}
				});
				console.log(y);
			}
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
	
	
	steak_contract.getAmountOfStakes.call(function(error, info) {
		if (!error) {
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