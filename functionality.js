

function nextPage() {
	if (currentPage === 1) {
		pageTurner();
	} else if (currentPage === 2) {
		consentChecker();
	} else if (currentPage === 3) {
		demographicsChecker();
	} else if (currentPage === 4) {
		instructionsChecker();
	} else if (currentPage === 5) {
		pageTurner();
	} else if (currentPage === 6) {
		$("#page5").hide();
		$("#page7").show();
	} else if (currentPage === 7) {
		pageTurner();
	} else if (currentPage === 8) {
		surveyCollector();
	}
}	
	
	
function consentChecker() {
	if ($("#consentCheck").is(":checked")) {
		pageTurner()
		$("#nextButton1").html("Send");
	} else {
		$("#consentError").show()
	}
}

function demographicsChecker() {
	username = document.getElementById("un").value;
	if (username.length < 3) {
		$("#nameError").show()
	} else {
		$("#nameError").hide()
		nameUpdater()
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
	
	if (username.length > 3 && userage > 14 && userage < 81 &&
		usergender.length > 3 && usereducation.length > 3) {
		
		$("#nextButton1").html("Next");
		pageTurner();
		instructionsTimer();
	}
	
}

function nameUpdater() {
	document.getElementById("withUN").textContent = username;
	document.getElementById("withUN").textContent = username;
}


function pageTurner() {
	$("#page" + currentPage).hide();
	currentPage++;
	$("#page" + currentPage).show();
}


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
	var timer = setTimeout(instructionOk, 5000);
}

function instructionOk() {
	instructionCheck = true;
}









/* Buttons */	
$(document).ready(function(){
	$("#nextButton1").show();
	
	/*$("#infoNext").show();*/
	$("#nextButton1").click(nextPage);
	$("#infoNext").on("click", nextInfo);
	$("#requestButton").click(requestData);
		
	$("#promotion1").click({param: "0"}, promoFunc);
	$("#promotion2").click({param: "1"}, promoFunc);
	$("#promotion3").click({param: "2"}, promoFunc);	
	
});







/* Defining variables */
var currentPage = 1;				/* OBS OBS */

var trialCounter = 1;

var instructionCheck = false;

var bonusBanker1 = 0;
var bonusBanker2 = 0;
var bonusBanker3 = 0;

var bonusList = ["bonus1", "bonus2", "bonus3"];
var bankerList = ["bonusBanker1", "bonusBanker2", "bonusBanker3"];
var displayList = ["bonusDisplay1", "bonusDisplay2", "bonusDisplay3"];


var usereducation
var usergender 
var username 
var userage 





/* Randomising banker names */
var nameList = ["Harry", "Oliver", "Jack", "Charlie", "Thomas", "Jacob", "James", "Josh", "William",
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



/* Adding functionality to input sliders*/
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
		
}


function displayUpdater() {
	for (var i = 1; i < displayList.length + 1; i++) {
		if ($("#bonus" + i).val() > 0) {
			$("#bonusDisplay" + i).html("$" + $("#bonus" + i).val() + ",000");
		} else {
			$("#bonusDisplay" + i).html("$0");
		}
	}
}


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


/* Randomising positions of banker personalities */

var personalityList = ["competent", "average", "incompetent"];


function shuffle(o) {
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

shuffle(personalityList);


/* Randomising alternatives and choises */

function portfolioRandomisation() {
		
	choiceList = [];
	decisionList = [];
	
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
			firstOutcome = (Math.floor(Math.random() * 10) + 11);
			secondOutcome = (Math.floor(Math.random() * 3) + 5);
		} else {
			firstProb = (Math.floor(Math.random() * 4) + 3) * 10;
			firstOutcome = (Math.floor(Math.random() * 4) + 11);
			secondOutcome = (Math.floor(Math.random() * 2) + 8);
		}
		
		secondProb = 100 - firstProb;
		
		outcomeProbs = firstProb + "%: $" + firstOutcome + ".0m</br>" + 
						secondProb + "%: $" + secondOutcome + ".0m";
						
		bondsProb = "100%: $10.1m";
		bondsOutcome = "$10.1m";
		
		
		/* Calculating expected value before luck is assigned for use in choiceMaker() */
		expectedValue = (firstProb / 100) * firstOutcome + 
						(secondProb / 100) * secondOutcome;
		
		
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
	
	/* Displaying choise based on expected values and whether choice is correct or incorrect */
	if (choiceList[i] === "correct") {
		if (expectedValue > 10.1) { 				/*Stocks are chosen*/
			decisionList.push("stocks");
			$("#result" + m).html(stockOutcome);
		} else {									/*Bonds are chosen*/
			decisionList.push("bonds");
			$("#result" + m).html(bondsOutcome);
		}
	} else {
		if (expectedValue <= 10.1) { 				/*Stocks are chosen*/
			decisionList.push("stocks");
			$("#result" + m).html(stockOutcome);
		} else {									/*Bonds are chosen*/
			decisionList.push("bonds");
			$("#result" + m).html(bondsOutcome);
		}
	}
};


function choiceDisplay() {
	console.log(decisionList);
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

var page5counter = 1;

/* Page 5 preperation */
function page5reset() {
	$(".outcome").hide();
	$(".result").hide();
	$(".bonus").hide();
	
	page5counter = 1;
}



function nextInfo() {
	if (trialCounter <= 2) {
		currentPage = 5;
	} else {
		currentPage = 6;
	}
	
	if (page5counter === 1) {
		choiceDisplay();
		$("#instructionsPage5").html("The investment decisions have been made, and the chosen alternatives now have red backgrounds. Click 'Next' to reveal the outcomes.");
	} else if (page5counter === 2) {
		$(".outcome").show();
		$(".result").show();
		$("#instructionsPage5").html("The results are out! </br> Click 'Next' to proceed.");
	} else if (page5counter === 3) {
		$(".bonus"). show();
		$("#instructionsPage5").html("Now, please allocate the bonus based on the information available. </br> Click 'Submit' to send your allocations to HR for it to be added to their next pay check.");
		$("#infoNext").html("Submit");
		if (helpTextShown === false){
			helpTextTime();
		}
	} else if (page5counter === 4) {
		$("#helpText").hide();
		$("#infoNext").hide();
		$("#requestButton").show();
		$("#subPage62").hide();
		trialCounter += 1;
		nextPage();
	}
	page5counter += 1;
}

var helpTextShown = false;

function helpTextTime() {
	timeoutID = window.setTimeout(helpTextShow, 1000);
}

function helpTextShow() {
	$("#helpText").fadeIn(3000);
	helpTextShown = true;
}


$(document).ready(function() {
	portfolioRandomisation();
	page5reset();
});



/* Requesting new month */

function requestData() {
	$("#subPage61").hide();
	$("#subPage62").show();
	move();
}

function move() {
  var elem = document.getElementById("progressBar");   
  var width = 0;
  var id = setInterval(frame, 3);
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
	$("#instructionsPage5").html("Again, carefully consider the options available to each banker.</br>Click 'Next' to reveal their choices.");
}


function promoFunc(event) {
	promoted = personalityList[(event.data.param)];
	nextPage();
	$("#nextButton1").show();
	$("#nextButton1").html("Submit");
}

function surveyCollector() {
	console.log("Hello");
	
}
