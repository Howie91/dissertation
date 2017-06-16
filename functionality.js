/*General functions */

/* Calling page-relevant functions */
function nextPage() {
	if (currentPage === 1) {
		consentChecker();
	} else if (currentPage === 2) {
		$("#nextButton1").html("Send");
		pageTurner();
	} else if (currentPage === 3) {
		demographicsChecker();
	} else if (currentPage === 4) {
		instructionsChecker();
	} else if (currentPage === 5) {
		pageTurner();
	} else if (currentPage === 6) {
		$("#page5").hide();
		$("#page7").show();
		currentPage++;
	} else if (currentPage === 7) {
		pageTurner();
	} else if (currentPage === 8) {
		surveyCollector();
	}
}	

/* Flippin' pages */	
function pageTurner() {
	$("#page" + currentPage).hide();
	currentPage++;
	$("#page" + currentPage).show();
}
	
/* Shufflin' */
function shuffle(o) {
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};
	

/* Page 1 */
/* Checks whether consent has been provided */
function consentChecker() {
	if ($("#consentCheck").is(":checked")) {
		pageTurner()
	} else {
		$("#consentError").show()
	}
}


/* Page 3 */
/* Checking and collecting demographics information */
function demographicsChecker() {
	username = document.getElementById("un").value;
	if (username.length < 1) {
		$("#nameError").show()
	} else {
		$("#nameError").hide()
	}
		
	var userage = document.getElementById("ua").value;
	if (userage < 15 || userage > 80) {
		$("#ageError").show()
	} else {
		$("#ageError").hide()
	}
	
	if ($('input[name="gender"]:checked').length > 0) {
		var usergender = document.querySelector('input[name="gender"]:checked').value;
		$("#genderError").hide()
	} else {
		$("#genderError").show()
	}
	
	if ($('input[name="education"]:checked').length > 0) {
		var usereducation = document.querySelector('input[name="education"]:checked').value;
		$("#eduError").hide()
	} else {
		$("#eduError").show()
	}
	
	if (username.length > 0 && userage > 14 && userage < 81 &&
		usergender.length > 3 && usereducation.length > 3) {
		
		dataList.push(userage);
		dataList.push(usergender);
		dataList.push(usereducation);
		
		nameUpdater()
		$("#nextButton1").html("Next");
		pageTurner();
		instructionsTimer();
		
		/* Preparing page 5 for first trial */
		portfolioRandomisation();
		page5reset();
		
		
	}
}

/* Updating remaining experiment with participant's name */
function nameUpdater() {
	$("#withUN").html(username);
	$("#withUserName").html(username);
}


/* Page 4 */
/* Confirming whether sufficient time has been spent on reading instructions */
function instructionsChecker() {
	if (instructionCheck) {
		pageTurner();
		$("#nextButton1").hide();
		$("#nextButton1").html("Next");
		$("#infoNext").show();
	} else {
		$("#instructionError").show();
		instructionCheck = true;
		$("#nextButton1").html("Yes");
	}
}


function instructionsTimer() {
	var timer = setTimeout(instructionOk, 30000); /* Set time requirement here */
}

function instructionOk() {
	instructionCheck = true;
}


/* Page 5 */
/* Randomising investment alternatives and calling choice maker function */
function portfolioRandomisation() {
		
	decisionList = [];
	choiceList = [];
	expectedValueList = [];
	resultList = [];
	
	for (i = 0; i < personalityList.length; i++) {
		
		/* Determining whether portfolio has high (extreme) or low risk */
		var extreme = false;
		var extremeDeterminator = (Math.floor(Math.random() * 100));
		
		if (personalityList[i] === "competent") {
			if (extremeDeterminator < 20) {
				extreme = true;
			}
		} else if (personalityList[i] === "average") {
			if (extremeDeterminator < 30) {
				extreme = true;
			}
		} else {
			if (extremeDeterminator < 40) {
				extreme = true;
			}
		}
	
		if (extreme) {
			firstProb = (Math.floor(Math.random() * 3) + 1) * 10;
			firstOutcome = (Math.floor(Math.random() * 7) + 13);
			secondOutcome = (Math.floor(Math.random() * 4) + 3);
		} else {
			firstProb = (Math.floor(Math.random() * 4) + 3) * 10;
			firstOutcome = (Math.floor(Math.random() * 3) + 11);
			secondOutcome = (Math.floor(Math.random() * 3) + 7);
		}
		
		secondProb = 100 - firstProb;
		
		outcomeProbs = firstProb + "%: $" + firstOutcome + ".0m<br>" + 
						secondProb + "%: $" + secondOutcome + ".0m";
						
		bondsProb = "100%: $10.1m";
		bondsOutcome = "$10.1m";
		
		
		/* Calculating expected value before luck is assigned for use in choiceMaker() */
		expectedValue = (firstProb / 100) * firstOutcome + 
						(secondProb / 100) * secondOutcome;
		
		expectedValueList.push(expectedValue);
		
		/* Adding bad luck to competent banker, and good luck to incompetent */
		if (personalityList[i] === "competent") {
			firstProb -= 20;
			secondProb += 20;
		} else if (personalityList[i] === "incompetent") {
			firstProb += 20;
			secondProb -= 20;
		}
		
		var probabilityVariableList = [firstProb, secondProb];
		
		
		/* Making sure probabilities lie between 0 and 100 */
		for (var j = 0; j < 2; j++) {
			if (probabilityVariableList[j] > 100) {
				probabilityVariableList[j] = 100;
			} else if (probabilityVariableList[j] < 0) {
				probabilityVariableList[j] = 0;
			}
		}
		
		
		/* Creating list of possible stock outcomes and randomising outcome */
		outcomeList = []
		
		for (var k = 0; k < firstProb; k++) {
			outcomeList.push(firstOutcome);
		}
		
		for (var n = 0; n < secondProb; n++) {
			outcomeList.push(secondOutcome);
		}
		
		
		stockOutcome = "$" + outcomeList[Math.floor(Math.random() * outcomeList.length)] + ".0m";
		
		m = i + 1;
		
		/* Sending input to GUI */
		$("#stock" + m).html(outcomeProbs);
		$("#outcomeStock" + m).html(stockOutcome);
		
		choiceMaker(i, m);
	}
};


/* Determining banker's investment choice See sub-comments */
function choiceMaker(i, m) {
	
	/* Determining whether banker makes a correct or incorrect decision */
	choiceProbability = (Math.floor(Math.random() * 100));
	
	if (personalityList[i] === "competent") {
		if (choiceProbability < 80) {
			compPersonDecision = "correct";		
		} else {
			compPersonDecision = "incorrect";
		}
		choiceList.push(compPersonDecision);
		
	} else if (personalityList[i] === "average") {
		if (choiceProbability < 65) {
			avgPersonDecision = "correct";		
		} else {
			avgPersonDecision = "incorrect";
		}
		choiceList.push(avgPersonDecision);
		
	} else if (personalityList[i] === "incompetent") {
		if (choiceProbability < 50) {
			incompPersonDecision = "correct";		
		} else {
			incompPersonDecision = "incorrect";
		}
		choiceList.push(incompPersonDecision);
	}
	
	/* Displaying choice based on expected values and whether choice is correct or incorrect */
	if (choiceList[i] === "correct") {
		if (expectedValue > 10.1) { 				/*Stocks are chosen*/
			decisionList.push("stocks");
			$("#result" + m).html(stockOutcome);
			resultList.push(stockOutcome.slice(1, stockOutcome.length - 1));
		} else {									/*Bonds are chosen*/
			decisionList.push("bonds");
			$("#result" + m).html(bondsOutcome);
			resultList.push(bondsOutcome.slice(1, bondsOutcome.length - 1));
		}
	} else {
		if (expectedValue <= 10.1) { 				/*Stocks are chosen*/
			decisionList.push("stocks");
			$("#result" + m).html(stockOutcome);
			resultList.push(stockOutcome.slice(1, stockOutcome.length - 1));
		} else {									/*Bonds are chosen*/
			decisionList.push("bonds");
			$("#result" + m).html(bondsOutcome);
			resultList.push(bondsOutcome.slice(1, bondsOutcome.length - 1));
		}
	}
};




/* Calculating remaining bonus, and calling for display update */
function bonusUpdater() {
	
	remainingBonus = 100 - $("#bonus1").val() - $("#bonus2").val() - $("#bonus3").val();
	
	if (remainingBonus === 0) {
		$("#bonusRemaining").html("Remaining: $0");
	} else {
		$("#bonusRemaining").html("Remaining: $" + remainingBonus + ",000");
	}
	
	displayUpdater();
	
	if (remainingBonus < 0) {
		$(".bonus").css( {
			"backgroundColor": "red"
		})
		$("#bonusRemaining").css( {
			"fontWeight": "bold",
			"fontSize": "0.9em"
		})
		$("#bonusError").show();
	} else {
		;$(".bonus").css( {
			"backgroundColor": "#a296ff"
		})
		$("#bonusRemaining").css( {
			"fontWeight": "normal",
			"fontsize": "0.8em"
		})
		$("#bonusError").hide();
	}
	
	if (remainingBonus < 90) {
		$("#lowBonusError").hide();
		$("#infoNext").html("Submit");
	}
		
}

/* Updates numbers displayed to user */
function displayUpdater() {
	for (var i = 1; i < 3 + 1; i++) {
		if ($("#bonus" + i).val() > 0) {
			$("#bonusDisplay" + i).html("$" + $("#bonus" + i).val() + ",000");
		} else {
			$("#bonusDisplay" + i).html("$0");
		}
	}
}




/* Changing background colours of chosen alternatives */
function choiceDisplay() {
	for (var i = 0; i < 3; i++) {
		var n = i + 1;
		if (decisionList[i] === "stocks") {
			$("#stock" + n).css( {
				"backgroundColor": "red",
				"fontWeight": "bold"
			});
			$("#bond" + n).css( {
				"backgroundColor": "#4cfff6",
				"fontWeight": "normal"
			});
			
		} else {
			$("#bond" + n).css( {
				"backgroundColor": "red",
				"fontWeight": "bold"
			});
			$("#stock" + n).css( {
				"backgroundColor": "#4cfff6",
				"fontWeight": "normal"
			});
		}
	}
}


/* Page 5 preperation */
function page5reset() {
	$(".outcome").hide();
	$(".result").hide();
	$(".bonus").hide();
	$("#lowBonusError").hide();
	doubleCheck = false;
	$("#bonus1").val(0);
	$("#bonus2").val(0);
	$("#bonus3").val(0);
	bonusUpdater();
	displayUpdater();
	
	page5counter = 1;
}


/* Displaying information on click of 'Next' button */
function nextInfo() {
	if (trialCounter <= 2) {
		currentPage = 5;
	} else {
		currentPage = 6;
	}
	
	if (page5counter === 1) {
		choiceDisplay();
		$("#instructionsPage5").html("The investment decisions have been made, and the chosen alternatives are now highlighted with a red background. Click 'Next' to reveal the outcomes.");
	} else if (page5counter === 2) {
		$(".outcome").show();
		$(".result").show();
		$("#instructionsPage5").html("The results are out! <br> Click 'Next' to proceed.");
	} else if (page5counter === 3) {
		$(".bonus"). show();
		$("#instructionsPage5").html("Now, please allocate the bonus based on the information available. <br> Click 'Submit' to send your allocations to HR for it to be added to their next pay check.");
		$("#infoNext").html("Submit");
		if (helpTextShown === false){
			helpTextTime();
		}
	} else {
		$("#requestButton").show();
		$("#subPage62").hide();
		$("#month").html(monthList[trialCounter - 1]);
		bonusCollector();
	}
	page5counter += 1;
}


/* Animating in help text */
function helpTextTime() {
	timeoutID = window.setTimeout(helpTextShow, 700);
}

function helpTextShow() {
	$("#helpText").fadeIn(3000);
	helpTextShown = true;
}


/* Checking and collecting bonus, displays error if budget is not met, and requires confirmation for small bonus allocations */
function bonusCollector() {
	
	if (doubleCheck === true && remainingBonus >= 90) {
		dataCollector();
		nextPage();
		$("#helpText").hide();
		$("#infoNext").hide();
		trialCounter += 1;
	}
	
	if (remainingBonus < 90 && remainingBonus >= 0) {
		dataCollector();
		nextPage()
		$("#helpText").hide();
		$("#infoNext").hide();
		trialCounter += 1;
	} else if (remainingBonus >= 90) {
		$("#lowBonusError").show();
		$("#infoNext").html("Yes");
		doubleCheck = true;
	}
}

/* Collects and stores trial data to Firebase */
function dataCollector() {
	var bonusList = [];
	
	for (var x = 1; x < 4; x++) {
		bonusList.push($("#bonus" + x).val());
	};
	
	
	dataList.push(trialCounter);
	dataList.push(expectedValueList[indexComp]);
	dataList.push(decisionList[indexComp]);
	dataList.push(choiceList[indexComp]);
	dataList.push(resultList[indexComp]);
	dataList.push(bonusList[indexComp]);
	
	dataList.push(expectedValueList[indexAvg]);
	dataList.push(decisionList[indexAvg]);
	dataList.push(choiceList[indexAvg]);
	dataList.push(resultList[indexAvg]);
	dataList.push(bonusList[indexAvg]);
	
	dataList.push(expectedValueList[indexIncomp]);
	dataList.push(decisionList[indexIncomp]);
	dataList.push(choiceList[indexIncomp]);
	dataList.push(resultList[indexIncomp]);
	dataList.push(bonusList[indexIncomp]);
};


/* Resets and prepares for new trial */
function trialReset() {
	portfolioRandomisation();
	page5reset();
	$("#page6").hide();
	$("#subPage62").hide();
	$("#subPage61").show();
	width = 0;
	$("#page5").show();
	$("#infoNext").html("Next");
	$("#infoNext").show();
	$(".alternative").css( {
		"backgroundColor": "#4cfff6",
		"fontWeight": "normal"
	});
	$("#instructionsPage5").html("Again, carefully consider the options available to each banker.<br>Click 'Next' to reveal their choices.");
}


/* Page 6 */
/* Requesting new month */
function requestData() {
	$("#subPage61").hide();
	$("#subPage62").show();
	move();
}


/* Animating progress bar */
function move() {
  var elem = document.getElementById("progressBar");   
  var width = 0;
  var id = setInterval(frame, 12);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
	  trialReset();
    } else {
      width += 0.2; 
      elem.style.width = width + '%'; 
    }
  }
}


/* Page 7 */
/* Collects promotion data and displays final page */
function promoFunc(event) {
	promoted = personalityList[(event.data.param)];
	dataList.push(promoted);
	nextPage();
	$("#nextButton1").show();
	$("#nextButton1").html("Submit");
}

/* Page 8*/
/* Collects survey data */
function surveyCollector() {
	competenceQ = document.querySelector('input[name="competence"]:checked').value;
	decisionQ = document.querySelector('input[name="decisionQuality"]:checked').value;
	outcomeQ = document.querySelector('input[name="outcomeQuality"]:checked').value;
	
	dataList.push(competenceQ);
	dataList.push(decisionQ);
	dataList.push(outcomeQ);
	
	ref.push(dataList);
	
	
	/* Generating, storing and displaying HIT Approval Code */
	var approvalCode = Math.random().toString(36).slice(-8);
	firebase.database().ref('Approval Codes').push(approvalCode);
	$("#approvalCode").html(approvalCode);
	
	
	$("#nextButton1").hide();
	pageTurner();
}




/* Adding functionality to buttons */	
$(document).ready(function(){
	$("#nextButton1").show();
	
	$("#nextButton1").click(nextPage);
	$("#infoNext").on("click", nextInfo);
	$("#requestButton").click(requestData);
		
	$("#promotion1").click({param: "0"}, promoFunc);
	$("#promotion2").click({param: "1"}, promoFunc);
	$("#promotion3").click({param: "2"}, promoFunc);	
});


/* Adding functionality to input sliders */
$(document).ready(function() {
	$('#bonus1').on('input', function() {
		bonusBanker1 = $("#bonus1").val();
		bonusUpdater();
	});
	
	$('#bonus2').on('input', function() {
		bonusBanker2 = $("#bonus2").val();
		bonusUpdater();
	});
	
	$('#bonus3').on('input', function() {
		bonusBanker3 = $("#bonus3").val();
		bonusUpdater();
	});
});



/* Defining variables */
var currentPage = 1;
var trialCounter = 1;

var personalityList = ["competent", "average", "incompetent"];


var dataList = [];


/* Page 3 Variables */
var usereducation;
var usergender;
var username;
var userage;


/* Page 4 variables */
var instructionCheck = false;


/* Page 5 variables */
var page5counter = 1;

var remainingBonus = 100;

var bonusBanker1 = 0;
var bonusBanker2 = 0;
var bonusBanker3 = 0;

var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var doubleCheck = false;
var helpTextShown = false;

/* Page 8 */
var competence = -1;
var decisionQuality = -1;
var outcomeQuality = -1;





/* Generic code running when page has loaded */

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10){
	dd='0'+dd;
} 

if(mm<10){
	mm='0'+mm;
} 

var currentDay = dd + '/' + mm + '/' + yyyy;


var hours = today.getHours();
var minutes = today.getMinutes();
var seconds = today.getSeconds();

if (hours < 10){
	hours = '0' + hours;
}

if (minutes < 10){
	minutes = '0' + minutes;
}

if (seconds < 10){
	seconds = '0' + seconds;
}

var currentTime = hours + ":" + minutes + ":" + seconds;

dataList.push(currentDay);
dataList.push(currentTime);


/* Randomising banker names */
var nameList = ["Harry", "Matt", "Oliver", "Jack", "Charlie", "Thomas", "Jacob", "James", "Josh", "William",
			   "Ethan", "George", "Riley", "Daniel", "Sam", "Oscar", "Joseph", "Mohammed", "Max"];

$(document).ready(function() {

	for (var i = 1; i < 4; i++) {
		var bankerName = nameList[Math.floor(Math.random() * nameList.length)];
	
		for (var j = nameList.length - 1; j >= 0; j--) {
			if (nameList[j] === bankerName) {
				nameList.splice(j, 1);
				break;
			}
		}
		
		var text = $('.name' + i).html().replace(RegExp("name" + i, "g"), bankerName);
		$('.name' + i).html(text);
	}
});


/* Randomising banker images */
var imageList = ["person1", "person2", "person3", "person4", "person5", "person6", "person7"];

$(document).ready(function() {
	
	for (var i = 1; i < 4; i++) {
		var chosenImage = imageList[Math.floor(Math.random() * imageList.length)];

		for (var j = imageList.length - 1; j >= 0; j--) {
			if (imageList[j] === chosenImage) {
				imageList.splice(j, 1);
				break;
			}
		}
		$('.image' + i).attr("src", "resources/persons/" + chosenImage + ".png");
	}
});



/* Randomising positions of banker personalities */
$(document).ready(function() {
	shuffle(personalityList);
	
	indexComp = personalityList.indexOf("competent");
	indexAvg = personalityList.indexOf("average");
	indexIncomp = personalityList.indexOf("incompetent");
	
});


$(document).ready(function() {
	if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i) ){
		$("#page1").hide();
		$("#sideContainer").hide();
		$("#IEerror").show();
	}
});

/* Initialize Firebase */
$(document).ready(function() {
	var config = {
	apiKey: "AIzaSyAd3DYft_Mlx7h5sukd2AB3irAOgH0Hz38",
	authDomain: "the-bonus-experiment.firebaseapp.com",
	databaseURL: "https://the-bonus-experiment.firebaseio.com",
	projectId: "the-bonus-experiment",
	storageBucket: "the-bonus-experiment.appspot.com",
	messagingSenderId: "146625832163"
	};
	firebase.initializeApp(config);	
	
	database = firebase.database();
	ref = database.ref('Experimental Data');	
});

