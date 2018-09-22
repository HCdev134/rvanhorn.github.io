let triviaInfo = [{
		question: "Tony Stark's superhero alter-ego is?",
		answer1: "Metal Warrior",
		answer2: "War Machine",
		answer3: "Tin Man",
		answer4: "Iron Man",
		correctAnswer: "Iron Man",
	},
	{
		question: "What is the name of Captain America's love interest?",
		answer1: "Sue Richards",
		answer2: "Peggy Carter",
		answer3: "Barbra Gordon",
		answer4: "May Parker",
		correctAnswer: "Peggy Carter",
	},
	{
		question: "Black Widow is originally from what country?",
		answer1: "Ukraine",
		answer2: "Czech Republic",
		answer3: "Russia",
		answer4: "Siberia",
		correctAnswer: "Russia",
	},
	{
		question: "How many Infinity Stones are there?",
		answer1: "5",
		answer2: "7",
		answer3: "6",
		answer4: "4",
		correctAnswer: "6",
	},
	{
		question: "What is Falcon's real name?",
		answer1: "Sam Hunter",
		answer2: "Jonathan Willstroke",
		answer3: "Sam Wilson",
		answer4: "Logan Pierce",
		correctAnswer: "Sam Wilson",
	}
]

let currentQuestion = 0;
let questionsCorrect = 0;
let questionsWrong = 0;
let questionAnswered = false;

$('#game-start').click(function () {

	currentQuestion = 0;
	questionsCorrect = 0;
	questionsWrong = 0;
	questionAnswered = false;

	$("#score-correct").text(questionsCorrect);
	$("#score-wrong").text(questionsWrong);

	$('#audio').get(0).play();
	$('#game-start').hide();

	start();

})

$("#answer1").click(function () {
	selectedAnswer = triviaInfo[currentQuestion].answer1;
	answerCheck();
});
$("#answer2").click(function () {
	selectedAnswer = triviaInfo[currentQuestion].answer2;
	answerCheck();
});
$("#answer3").click(function () {
	selectedAnswer = triviaInfo[currentQuestion].answer3;
	answerCheck();
});
$("#answer4").click(function () {
	selectedAnswer = triviaInfo[currentQuestion].answer4;
	answerCheck();
});


function start() {

	if (currentQuestion !== triviaInfo.length) {

		$('#selection').hide();
		$('#results').hide();

		clearQuestion();
		timer();
		showQuestion();

	} else {

		clearQuestion();

		$('#game-start').show();
		$('#results').show();
		$('#selection').show();
		$("#results").text("Wanna play another game?")
		$("#selection").text("Then click 'Start Game' above.")

	}
}

function timer() {

	var startTime = 10;
	var timer = setInterval(function () {

		startTime--;
		$('#time').html(startTime);

		if (questionAnswered === true) {

			timeStop = startTime + 1
			$('#time').html(timeStop);
			clearInterval(timer);

			setTimeout(function () {

				questionAnswered = false;
				$('#time').text(10);
				start();

			}, 2000);
		}

		if (startTime === 0) {

			clearInterval(timer);
			selectedAnswer = "Blank";
			answerCheck();

			setTimeout(function () {

				$('#time').text(10);
				start();

			}, 2000);
		}

	}, 1000);
};

function showQuestion() {

	// Populate questions and answers.
	$("#question").text(triviaInfo[currentQuestion].question)
	$("#answer1").text(triviaInfo[currentQuestion].answer1)
	$("#answer2").text(triviaInfo[currentQuestion].answer2)
	$("#answer3").text(triviaInfo[currentQuestion].answer3)
	$("#answer4").text(triviaInfo[currentQuestion].answer4)
}

function answerCheck() {

	if (selectedAnswer === triviaInfo[currentQuestion].correctAnswer) {

		console.log("Correct: " + selectedAnswer)
		console.log("Correct: " + triviaInfo[currentQuestion].correctAnswer)

		questionsCorrect = questionsCorrect + 1
		currentQuestion = currentQuestion + 1;

		console.log("Question: " + currentQuestion)

		questionAnswered = true;

		$("#score-correct").text(questionsCorrect);

		clearQuestion();
		correctAnswer();

	} else if (selectedAnswer === "Blank") {

		console.log("Answer was left blank!")

		questionsWrong = questionsWrong + 1
		currentQuestion = currentQuestion + 1;

		console.log("Question: " + currentQuestion)

		$("#score-wrong").text(questionsWrong);

		clearQuestion();
		blankAnswer();

	} else {

		console.log("Incorrect: " + selectedAnswer)
		console.log("Correct: " + triviaInfo[currentQuestion].correctAnswer)

		questionsWrong = questionsWrong + 1
		currentQuestion = currentQuestion + 1;

		console.log("Question: " + currentQuestion)

		questionAnswered = true;

		$("#score-wrong").text(questionsWrong);

		clearQuestion();
		wrongAnswer();


	}
}

function correctAnswer() {
	$('#selection').show();
	$('#results').show();
	$("#results").text("Congrats!")
	$("#selection").text(selectedAnswer + " was the correct answer.")
}

function wrongAnswer() {
	$('#selection').show();
	$('#results').show();
	$("#results").text("Sorry!")
	$("#selection").text(selectedAnswer + " was not the correct answer.")
}

function blankAnswer() {
	$('#selection').show();
	$('#results').show();
	$("#results").text("Hey Now!")
	$("#selection").text("Don't give up so easily next time!")
}

function clearQuestion() {

	$("#question").text("")
	$("#answer1").text("")
	$("#answer2").text("")
	$("#answer3").text("")
	$("#answer4").text("")
	$("#results").text("")
	$("#selection").text("")

}