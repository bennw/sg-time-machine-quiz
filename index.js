STORE = [
	{ question: "Joseph Schooling won Singapore's first ever Olympic gold medal, in the men's 100m butterfly 🏊",
	answer: "He won it during the 2016 Summer Olympics in Rio de Janeiro!",
	correctYear:2016,
	},
	{ question: "What are the three secondary colors?",
	answer: ["green, blue, purple", "green, orange, purple", "red, yellow, blue", "red, yellow, purple"],
	correctAnswer:"green, orange, purple"
	},
	{ question: "What are analagous colors?",
	answer: ["colors directly opposite each other on the color wheel", "one color, except different shades", "any three colors that are by side on the color wheel", "black and white"],
	correctAnswer: "any three colors that are by side on the color wheel"
	},
	{ question: "Warm colors are:",
	answer: ["red, orange, yellow", "blue, green purple", "red, green, blue", "orange, purple, yellow"],
	correctAnswer: "red, orange, yellow"
	},
	{ question: "Tint refers to:",
	answer: ["when you add white to a hue", "when you add black to a hue", "when you mix colors together", "when you add a primary color to an existing hue"],
	correctAnswer: "when you add white to a hue"
	}
]
/* sets initial values to zero for the question number and score */

let qNumber = 0;
let score = 0;
let yearSelected = 2022;

let sliderMin = 2002;
let sliderMax = 2022;

/* event listener for start quiz button. Hides the start page and calls the function generateQuizQuestion */
function startQuiz() {
	$('main').on('click', '#button-start', function(event){
		$('.start-quiz').hide();
		$('.js-answer').hide()
		generateQuizQuestion();
	});
}

/* begins displaying quiz questions from the STORE array until the very last question has been displayed, then calls the displayResults function */
function generateQuizQuestion()
{
	if (qNumber < STORE.length)
	{
		let question = $(`
		<form class="js-quiz-form">
		<legend class="question">${STORE[qNumber].question}</legend>
		<br>
		<div class="radiogroup"></div>
		</form>
		`);
		// <ul class="radiogroup" role="radiogroup" aria-labelledby="question"></ul>
		let answersSlider = $(`
		<div class="slider_selection"><input id="slider" autofocus/></div>
		`);
		let button = $(`<button type="button" id="button-submit">Submit</button>`);
		let sliderScript = $(`
		<script>
		$("#slider").ionRangeSlider({
			skin: "big",
			min: ${sliderMin},
			max: ${sliderMax},
			from: ${sliderMax},
			grid: true,
			prettify_enabled: false,
			onStart: function (data) {
				// fired then range slider is ready
			},
			onChange: function (data) {
				// fired on every range slider update
				yearSelected = data.from;
			},
			onFinish: function (data) {
				// fired on pointer release
			},
			onUpdate: function (data) {
				// fired on changing slider with Update method
			}
		});</script>`);
		$('.js-quiz').append(question);
		$('.radiogroup').append(answersSlider, button);
		$('.js-quiz').append(sliderScript);
		yearSelected = 2022;
		questionNumber();
	} 
	else
	{
		displayResults();
	}
}

/* event listener for the submit button. Then checks to see if an input is selected, and if the answer selected is correct */
function questionChecker(){
	$('main').on('click','#button-submit', function (event){
		let scoreDelta = 10 - Math.abs(STORE[qNumber].correctYear - yearSelected);
		addScore(scoreDelta);
		rightAnswer();
	});
}

/* updates the question number and displays it at the top of the page */
function questionNumber(){
	$('header').find('#question-number').text(qNumber+1);
}

/* keeps score of correct answers and displays at the top of the page */
function addScore(n){
	score += n;
	$('header').find('#score').text(`${score}`);

}

/* displays the page for when the answer is right, updates score accordingly */
function rightAnswer() {
	let ans = STORE[qNumber].answer;
	console.log(`rightAnswer ran, ${yearSelected} -> ${STORE[qNumber].correctYear}`);
	let sliderScript = $(`
	<script>
	$("#slider").ionRangeSlider({
		skin: "big",
		min: ${sliderMin},
		max: ${sliderMax},
		from: ${yearSelected},
		grid: true,
		prettify_enabled: false,
		from_min: ${yearSelected},
		from_max: ${yearSelected},
		onStart: function (data) {
			// fired then range slider is ready
            addMarks(data.slider);
		},
		onChange: function (data) {
			// fired on every range slider update
			yearSelected = data.from;
		},
		onFinish: function (data) {
			// fired on pointer release
		},
		onUpdate: function (data) {
			// fired on changing slider with Update method
		}
	});</script>`);
	$('.js-quiz-form').hide();
	$('.js-answer').append(`<form class="js-quiz-form"><h2>${ans}</h2>
	<div class="slider_selection"><input id="slider" /></div>
	<button type="button" id="button-next">Next Question</button></form>`).show();
	$('.js-answer').append(sliderScript);
	// <img src="img/right-answer.jpg" alt="abstract painting" id="right-answer"/>
}

function convertToPercent(num) {
	return (num - sliderMin) / (sliderMax - sliderMin) * 100;
}
function addMarks($slider) {
	var html = '';
	var left = 0;
	var left_p = "";
	var i;

	// repeat block below for each mark
	left = convertToPercent(STORE[qNumber].correctYear) * 0.965;
	left_p = left + "%";
	html += '<span class="showcase__mark" style="left: ' + left_p + '">';
	html += STORE[qNumber].correctYear;
	html += '</span>';

	$slider.append(html);
}

/* displays page for when the answer is wrong and displays the correct answer */
function wrongAnswer() {
	$('.js-quiz-form').hide();
	$('.js-answer').append(`<h2>That answer is not quite right...</h2>
		<img src="img/wrong-answer.jpg" alt="child with paint all over face" id="wrong-answer"/>
		<h3>The correct answer is:</h3>
		<p><span class="correct-answer">${STORE[qNumber].correctAnswer}</span></p>
		<button type="button" id ="button-next">Next</button>`).show();
}

/* event listener for the next question button, calls the generateQuizQuestion function to display the next question */
function nextQuestion() {
	$('main').on('click','#button-next', function(event) {
		$('.js-answer').empty();
		$('.js-quiz-form').empty();
		$('.js-answer').empty().hide();
		qNumber++;
		generateQuizQuestion();
		$('.js-quiz-form').show();
	});
}

/* displays the final percentage score and total number of correct answers */
function displayResults(){
	console.log("`displayResults` ran");
	let finalScore = (score/5)*100;
	$('.js-answer').append(`<h2>Quiz Results</h2>
	<img id="paint-bucket" alt="red paint bucket" src = "img/paint-bucket.jpg"/>
	<h3>${finalScore}%</h3>
	<p>You got <span class="right-answers">${score} </span>out of 5 questions right.</p>
	<button type="button" id ="button-restart">Start a New Quiz</button>`)
}

function restartQuiz(){
	console.log('restart quiz ran');
 $('main').on('click', '#button-restart', function(event){
	 console.log('restart button clicked');
	score = 0;
	qNumber = 0;
	$('.js-answer').empty();
	$('.js-quiz-form').empty();
	$('.start-quiz').show();
	$('header').find('#score').text(`${score}/5`);
	$('header').find('#question-number').text(`${qNumber}`);
 });
}

function handleQuizApp(){
	startQuiz();
	questionChecker();
	nextQuestion();
	restartQuiz();
}

/* calls the handleQuizApp to activate functions with event listeners */
$(handleQuizApp);
