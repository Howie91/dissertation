

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
	console.log(window.username);
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


/* Defining variables */
var currentPage = 1;

var instructionCheck = false;

var bonusBanker1 = 0;
var bonusBanker2 = 0;
var bonusBanker3 = 0;

var bonusList = ["bonus1", "bonus2", "bonus3"];
var bankerList = ["bonusBanker1", "bonusBanker2", "bonusBanker3"];

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


function bonusUpdater() {
	var remainingBonus = 100 - bonusBanker1 - bonusBanker2 - bonusBanker3;
	if (remainingBonus > 0) {
		$("#bonusRemaining").html("Remaining: $" + remainingBonus + ",000");
	} else {
		$("#bonusRemaining").html("Remaining: $0");
		/*document.getElementById("bonus1").value = "1";*/
		
		for (var i = 0; i < bonusList.length; i++) {
			var reducedBonus = eval(bankerList[i]) - 1;
			document.getElementById(bonusList[i]).value = reducedBonus;
			console.log(reducedBonus);
			bankerList[i] = reducedBonus;
		}
		/*bankerBonus1();*/
	}
}	
/*
function bankerBonus1() {
	bonusBanker1 = $(this).val();
	if (bonusBanker1 > 0) {
		$("#bonusDisplay1").html("$" + bonusBanker1 + ",000");
	} else {
		$("#bonusDisplay1").html("$0");
	}
	bonusUpdater()
}

var p = document.getElementById("bonus1");

if (p) {
	p.addEventListener("ValueChange", bankerBonus1(), false);
}

*/

$("#bonus1").input(function() {
	console.log("Hello");
	document.querySelector("#bonus1").addEventListener('input', function() {
		bonusBanker1 = $(this).val();
		if (bonusBanker1 > 0) {
			$("#bonusDisplay1").html("$" + bonusBanker1 + ",000");
		} else {
			$("#bonusDisplay1").html("$0");
		}
		bonusUpdater()
	});
});

document.querySelector("#bonus2").addEventListener('ValueChange', function() {
    bonusBanker2 = $(this).val();
	if (bonusBanker2 > 0) {
		$("#bonusDisplay2").html("$" + bonusBanker2 + ",000");
	} else {
		$("#bonusDisplay2").html("$0");
	}
	bonusUpdater()
});

var bonusThree = document.querySelector("#bonus3");



	document.querySelector("#bonus3").addEventListener('ValueChange', "#bonus3", function() {
		bonusBanker3 = $(this).val();
		if (bonusBanker3 > 0) {
			$("#bonusDisplay3").html("$" + bonusBanker3 + ",000");
		} else {
			$("#bonusDisplay3").html("$0");
		}
		bonusUpdater()
	});




/*
ID="bonus1"
ID="bonusDisplay1"
ID="bonusRemaining"
*/


