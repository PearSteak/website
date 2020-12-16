window.addEventListener('load', () => {
	setInterval(updateDeal, 1000);
	updateDeal();
	
	if(typeof(web3) === 'undefined') {
		return console.log("Metamask is not installed");
	}
	
	var account =
	web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
		? web3.eth.accounts[0]
		: '0x0000000000000000000000000000000000000001';
		
	pear_contract = web3.eth.contract(pear_abi).at(pear_contract_address);
	pear_uniswap_contract = web3.eth.contract(pear_abi).at(pear_uniswap_contract_address);
	pearLP_contract = web3.eth.contract(pearLP_abi).at(pearLP_contract_address);
	steak_contract = web3.eth.contract(steak_abi).at(steak_contract_address);
	steak_uniswap_contract = web3.eth.contract(steak_abi).at(steak_uniswap_contract_address);
	steakLP_contract = web3.eth.contract(steakLP_abi).at(steakLP_contract_address);
	sales_contract = web3.eth.contract(sales_abi).at(sales_contract_address);
	
	setInterval(updatePearTotalSupply, 10000);
	updatePearTotalSupply();
	setInterval(updatePearBalance, 10000);
	updatePearBalance();
	setInterval(updatePearStakeList, 10000);
	updatePearStakeList();
	
	setInterval(updatePearLPApprovalBalance, 10000);
	updatePearLPApprovalBalance();
	setInterval(updatePearLPBalance, 10000);
	updatePearLPBalance();
	
	setInterval(updateSteakTotalSupply, 10000);
	updateSteakTotalSupply();
	setInterval(updateSteakBalance, 10000);
	updateSteakBalance();
	setInterval(updateSteakStakeList, 10000);
	updateSteakStakeList();
	
	setInterval(updateSteakLPApprovalBalance, 10000);
	updateSteakLPApprovalBalance();
	setInterval(updateSteakLPBalance, 10000);
	updateSteakLPBalance();
	
	setInterval(updateDeal, 1000);
	updateDeal();
	
	pear_contract.staked({}, function (error, result) {
        if (!error) {
			updatePearBalance();
			updatePearStakeList();
		}else {
			console.log(error);
		}
    });
	
	steak_contract.staked({}, function (error, result) {
        if (!error) {
			updateSteakBalance();
			updateSteakStakeList();
		}else {
			console.log(error);
		}
    });
	
	pear_contract.unstaked({}, function (error, result) {
        if (!error) {
			updatePearTotalSupply();
			updateSteakBalance();
			updatePearStakeList();
		}else {
			console.log(error);
		}
    });
	
	steak_contract.unstaked({}, function (error, result) {
        if (!error) {
			updateSteakTotalSupply();
			updatePearBalance();
			updateSteakStakeList();
		}else {
			console.log(error);
		}
    });
	
	sales_contract.bought({}, function (error, result) {
        if (!error) {
			updatePearTotalSupply();
			updateSteakTotalSupply();
			updatePearBalance();
			updateSteakBalance();
		}else {
			console.log(error);
		}
    });
	
	$(".pear_contract").text(pear_contract_address);
	$(".steak_contract").text(steak_contract_address);
	$(".pearLP_contract").text(pearLP_contract_address);
	$(".steakLP_contract").text(steakLP_contract_address);
});

if (window.ethereum !== undefined) {
	window.ethereum.enable();
};


// PEAR

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
	pear_contract.getMyFullBalance.call(function(error, info) {
		if (!error) {
			$(".pearTotalBalance_num").text((info/1000000000000000000).toFixed(2));
		} else {
			console.log(error);
		}
	});
	pear_contract.getMyBalance.call(function(error, info) {
		if (!error) {
			$(".pearAvailableBalance_num").text((info/1000000000000000000).toFixed(2));
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
			$(".pear-amount").attr("placeholder", (info/1000000000000000000).toFixed(2));
		} else {
			console.log(error);
		}
	});
};

function PearStake() {
	if ($(".pear-amount").val() == "") {
		$(".pear-amount").css('box-shadow', '0px 0px 10px #CC0000');
		$(".pear-amount").attr("placeholder", "INPUT AMOUNT!");
		return;
	} else {
		$(".pear-amount").css('box-shadow', '0px 0px 0px #CC0000');
	}
	
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
			$(".pear-amount").val("");
			$(".pear-dropdown").html("Option <span class=\"caret\"></span>");
			$(".pear-dropdown").val();
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

function unstakePear(_stake) {
	pear_contract.unstake(_stake, function(error, hash) {
		if (!error) {
			console.log(hash);
		} else {
			console.log(error);
		}
	});
}


// PEAR LP

function updatePearLPApprovalBalance() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
			
	pear_uniswap_contract.balanceOf(account, function(error, info) {
		if (!error) {
			$(".pearLP-amount-approve").attr("placeholder", (info/1000000000000000000).toFixed(5));
		} else {
			console.log(error);
		}
	});
};

function PearApprove() {
	if ($(".pearLP-amount-approve").val() == "") {
		$(".pearLP-amount-approve").css('box-shadow', '0px 0px 10px #CC0000');
		$(".pearLP-amount-approve").attr("placeholder", "INPUT AMOUNT!");
		return;
	} else {
		$(".pearLP-amount-approve").css('box-shadow', '0px 0px 0px #CC0000');
	}
	
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
	
	var approve_amount = $(".pearLP-amount-approve").val();
	if (approve_amount.lastIndexOf(".") != -1) {
		var dotPos = approve_amount.lastIndexOf(".");
		var amountOfZeroesNeeded = 18 - (approve_amount.length - (dotPos+1));
		for (i = 0; i < amountOfZeroesNeeded; i++) {
			approve_amount = approve_amount.concat("0");
		}
		approve_amount = approve_amount.replace(/[^-+\d]/g, "")
	} else {
		if (approve_amount.length < 18) {
			approve_amount = approve_amount.concat("000000000000000000");
		}
	}
	
	pear_uniswap_contract.approve(pearLP_contract_address, approve_amount, function(error, hash) {
		if (!error) {
			console.log(hash);
			$(".pearLP-amount-approve").val("");
		} else {
			console.log(error);
		}
	});
};

function updatePearLPBalance() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
			
	pear_uniswap_contract.allowance(account, pearLP_contract_address, function(error, info) {
		if (!error) {
			$(".pearLP-amount").attr("placeholder", (info/1000000000000000000).toFixed(5));
		} else {
			console.log(error);
		}
	});
};


// STEAK

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
	steak_contract.getMyFullBalance.call(function(error, info) {
		if (!error) {
			$(".steakTotalBalance_num").text((info/1000000000000000000).toFixed(2));
		} else {
			console.log(error);
		}
	});	
	steak_contract.getMyBalance.call(function(error, info) {
		if (!error) {
			$(".steakAvailableBalance_num").text((info/1000000000000000000).toFixed(2));
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
			$(".steak-amount").attr("placeholder", (info/1000000000000000000).toFixed(2));
		} else {
			console.log(error);
		}
	});
};

function SteakStake() {
	if ($(".steak-amount").val() == "") {
		$(".steak-amount").css('box-shadow', '0px 0px 10px #00CC00');
		$(".steak-amount").attr("placeholder", "INPUT AMOUNT!");
		return;
	} else {
		$(".steak-amount").css('box-shadow', '0px 0px 0px #00CC00');
	}
	
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
			$(".steak-amount").val("");
			$(".steak-dropdown").html("Option <span class=\"caret\"></span>");
			$(".steak-dropdown").val();
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

function unstakeSteak(_stake) {
	steak_contract.unstake(_stake, function(error, hash) {
		if (!error) {
			console.log(hash);
		} else {
			console.log(error);
		}
	});
}


// STEAK LP

function updateSteakLPApprovalBalance() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
			
	steak_uniswap_contract.balanceOf(account, function(error, info) {
		if (!error) {
			$(".steakLP-amount-approve").attr("placeholder", (info/1000000000000000000).toFixed(5));
		} else {
			console.log(error);
		}
	});
};

function updateSteakLPBalance() {
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
			
	steak_uniswap_contract.allowance(account, steakLP_contract_address, function(error, info) {
		if (!error) {
			$(".steakLP-amount").attr("placeholder", (info/1000000000000000000).toFixed(5));
		} else {
			console.log(error);
		}
	});
};


// INFO MODAL

function openInfoModal() {
	$("#infoModal").show();
}

function closeInfoModal() {
	$("#infoModal").hide();
}


// DEAL

function updateDeal() {
	var now = new Date;
	var utc_timestamp = Date.UTC(now.getFullYear(),now.getMonth(), now.getDate() , 
      now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
	$("#deal").text(secondsToHms(1607720400 - Math.floor(utc_timestamp / 1000)));
};

function buy() {
	if ($(".buyamount").val() == "") {
		$(".buyamount").css('box-shadow', '0px 0px 10px #CC0000');
		$(".buyamount").attr("placeholder", "INPUT AMOUNT!");
		return;
	} else {
		$(".buyamount").css('box-shadow', '0px 0px 0px #CC0000');
	}
	
	var account =
		web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
			? web3.eth.accounts[0]
			: '0x0000000000000000000000000000000000000001';
			
	var amount = $(".buyamount").val();
	if (amount.lastIndexOf(".") != -1) {
		var dotPos = amount.lastIndexOf(".");
		var amountOfZeroesNeeded = 18 - (amount.length - (dotPos+1));
		for (i = 0; i < amountOfZeroesNeeded; i++) {
			amount = amount.concat("0");
		}
		amount = amount.replace(/[^-+\d]/g, "")
	} else {
		if (amount.length < 18) {
			amount = amount.concat("000000000000000000");
		}
	}
	
	sales_contract.buyTokens.sendTransaction({
		from: web3.eth.accounts[0],
		value: amount
	 },function(error , result){
		 if(!error)
			 console.log(result);
		 else
			 console.log(error.code)
	});
}


// MISC

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
	
	$(".pearLP-flexible").click(function(){
		$(".pearLP-dropdown").html("Flexible <span class=\"caret\"></span>");
		$(".pearLP-dropdown").val(0);
	});
	$(".pearLP-7days").click(function(){
		$(".pearLP-dropdown").html("7-days <span class=\"caret\"></span>");
		$(".pearLP-dropdown").val(1);
	});
	$(".pearLP-30days").click(function(){
		$(".pearLP-dropdown").html("30-days <span class=\"caret\"></span>");
		$(".pearLP-dropdown").val(2);
	});
	$(".pearLP-365days").click(function(){
		$(".pearLP-dropdown").html("365-days <span class=\"caret\"></span>");
		$(".pearLP-dropdown").val(3);
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
	
	$(".steakLP-flexible").click(function(){
		$(".steakLP-dropdown").html("Flexible <span class=\"caret\"></span>");
		$(".steakLP-dropdown").val(0);
	});
	$(".steakLP-7days").click(function(){
		$(".steakLP-dropdown").html("7-days <span class=\"caret\"></span>");
		$(".steakLP-dropdown").val(1);
	});
	$(".steakLP-30days").click(function(){
		$(".steakLP-dropdown").html("30-days <span class=\"caret\"></span>");
		$(".steakLP-dropdown").val(2);
	});
	$(".steakLP-365days").click(function(){
		$(".steakLP-dropdown").html("365-days <span class=\"caret\"></span>");
		$(".steakLP-dropdown").val(3);
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