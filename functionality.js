

function nextPage() {
	if (currentPage === 1) {
		pageTurner()
	} else if (currentPage === 2) {
		consentChecker()
	} else if (currentPage === 3) {
		demographicsChecker()
	} else if (currentPage === 4) {
		instructionsChecker()
	} else {
		pageTurner()
	}
}	
	
	
function consentChecker() {
	if ($("#consentCheck").is(":checked")) {
		pageTurner()
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
	
	if (username.length > 3 && userage > 14 && 
		usergender.length > 3 && usereducation.length > 3) {
		
			pageTurner();
			instructionsTimer();
	}
	
}

function nameUpdater() {
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
	} else {
		$("#instructionError").show();
		instructionCheck = true;
		$("#instructionsNext").html("Yes");
	}
}


function instructionsTimer() {
	var timer = setTimeout(instructionOk, 5000);
}

function instructionOk() {
	instructionCheck = true;
}





/* Buttons */	
$(".nextButton").click(nextPage);
$("#instructionsNext").click(nextInfo);


/* Defining variables */
var currentPage = 1;

var instructionCheck = false;

var bonusBanker1 = 0;
var bonusBanker2 = 0;
var bonusBanker3 = 0;

var bonusList = ["bonus1", "bonus2", "bonus3"];
var bankerList = ["bonusBanker1", "bonusBanker2", "bonusBanker3"];
var displayList = ["bonusDisplay1", "bonusDisplay2", "bonusDisplay3"];

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
		
		choiceMaker(i);
	}
};


/* Determining banker's investment choice See sub-comments */

choiceList = [];

function choiceMaker() {
	
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
			$("#stock" + m).css( {
				"backgroundColor": "red",
				"fontWeight": "bold"
			});
			$("#bond" + m).css( {
				"backgroundColor": "#4cfff6",
				"fontWeight": "normal"
			});
			$("#result" + m).html(stockOutcome);
		} else {									/*Bonds are chosen*/
			$("#bond" + m).css( {
				"backgroundColor": "red",
				"fontWeight": "bold"
			});
			$("#stock" + m).css( {
				"backgroundColor": "#4cfff6",
				"fontWeight": "normal"
			});
			$("#result" + m).html(bondsOutcome);
		}
	} else {
		if (expectedValue <= 10.1) { 				/*Stocks are chosen*/
			$("#stock" + m).css( {
				"backgroundColor": "red",
				"fontWeight": "bold"
			});
			$("#bond" + m).css( {
				"backgroundColor": "#4cfff6",
				"fontWeight": "normal"
			});
			$("#result" + m).html(stockOutcome);
		} else {									/*Bonds are chosen*/
			$("#bond" + m).css( {
				"backgroundColor": "red",
				"fontWeight": "bold"
			});
			$("#stock" + m).css( {
				"backgroundColor": "#4cfff6",
				"fontWeight": "normal"
			});
			$("#result" + m).html(bondsOutcome);
		}
	}
	
	
};






























