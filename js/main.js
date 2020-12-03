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
	
	setInterval(updatePearBalance, 10000);
	updatePearBalance();
	setInterval(updateSteakBalance, 10000);
	updateSteakBalance();
	
	setInterval(updatePearStakeList, 10000);
	updatePearStakeList();
	setInterval(updateSteakStakeList, 10000);
	updateSteakStakeList();
	
	pear_contract.staked({}, function (error, result) {
        if (!error) {
			$(".pear-amount").val("");
			updatePearBalance();
			updatePearStakeList();
		}else {
			console.log(error);
		}
    });
	
	steak_contract.staked({}, function (error, result) {
        if (!error) {
			$(".steak-amount").val("");
			updateSteakBalance();
			updateSteakStakeList();
		}else {
			console.log(error);
		}
    });
	
	pear_contract.unstaked({}, function (error, result) {
        if (!error) {
			updatePearTotalSupply();
			updatePearStakeList();
		}else {
			console.log(error);
		}
    });
	
	steak_contract.unstaked({}, function (error, result) {
        if (!error) {
			updateSteakTotalSupply();
			updateSteakStakeList();
		}else {
			console.log(error);
		}
    });
	
	
	
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
			num = num.toString().replace(/(\d)(?=(\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d)+(?!\d))/g, "$1.");
			$(".pear-amount").attr("placeholder", parseInt(num).toFixed(2));
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
			var num = info;
			num = num.toString().replace(/(\d)(?=(\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d)+(?!\d))/g, "$1.");
			$(".steak-amount").attr("placeholder", parseInt(num).toFixed(2));
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
	if (stake_amount.lastIndexOf(".") != -1) {
		var dotPos = stake_amount.lastIndexOf(".");
		var amountOfZeroesNeeded = 18 - (stake_amount.length - (dotPos+1));
		for (i = 0; i < amountOfZeroesNeeded; i++) {
			stake_amount = stake_amount.concat("0");
		}
		stake_amount = stake_amount.replace(/[^-+\d]/g, "")
	} else {
		if (stake_amount.length < 18) {
			stake_amount = stake_amount.concat("000000000000000000");
		}
	}
	
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
	if (stake_amount.lastIndexOf(".") != -1) {
		var dotPos = stake_amount.lastIndexOf(".");
		var amountOfZeroesNeeded = 18 - (stake_amount.length - (dotPos+1));
		for (i = 0; i < amountOfZeroesNeeded; i++) {
			stake_amount = stake_amount.concat("0");
		}
		stake_amount = stake_amount.replace(/[^-+\d]/g, "")
	} else {
		if (stake_amount.length < 18) {
			stake_amount = stake_amount.concat("000000000000000000");
		}
	}
	
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
			$("#pear_stake_table").empty();
			$.each(info, function( index, value ) {
				var amount = (value[0]/1000000000000000000).toFixed(2);
				var unlocks = secondsToHms(value[1]);
				var earned = (value[2]/1000000000000000000).toFixed(2);
				
				$("#pear_stake_table").append("<tr>" + 
													"<td>" + amount + "</td>" + 
													"<td>" + unlocks + "</td>" + 
													"<td>" + earned + "</td>" + 
													"<td><button type=\"button\" onclick=\"unstakePear(" + index + ");\" class=\"btn btn-success btn-sm unstake-button pear_unstake_" + index + "\" disabled>Unstake!</button></td>" + 
												"</tr>");
				if (unlocks == "") {
					$(".pear_unstake_" + index).prop('disabled', false);
				}
			});
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
			$("#steak_stake_table").empty();
			$.each(info, function( index, value ) {
				var amount = (value[0]/1000000000000000000).toFixed(2);
				var unlocks = secondsToHms(value[1]);
				var earned = (value[2]/1000000000000000000).toFixed(2);
				
				$("#steak_stake_table").append("<tr>" + 
													"<td>" + amount + "</td>" + 
													"<td>" + unlocks + "</td>" + 
													"<td>" + earned + "</td>" + 
													"<td><button type=\"button\" onclick=\"unstakeSteak(" + index + ");\" class=\"btn btn-danger btn-sm unstake-button steak_unstake_" + index + "\" disabled>Unstake!</button></td>" + 
												"</tr>");
				if (unlocks == "") {
					$(".steak_unstake_" + index).prop('disabled', false);
				}
			});
		} else {
			console.log(error);
		}
	});
};

function unstakePear(_stake) {
	pear_contract.unstake(_stake, function(error, hash) {
		if (!error) {
			console.log(hash);
		} else {
			console.log(error);
		}
	});
}

function unstakeSteak(_stake) {
	steak_contract.unstake(_stake, function(error, hash) {
		if (!error) {
			console.log(hash);
		} else {
			console.log(error);
		}
	});
}

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


function secondsToHms(d) {
    d = Number(d);
    var da = Math.floor(d / 86400);
    var h = Math.floor(d % 86400 / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var daDisplay = da > 0 ? da + (da == 1 ? " day " : " days ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return daDisplay + hDisplay + mDisplay + sDisplay; 
}