//GIVEN I am taking a code quiz
//WHEN I click the start button

//global variables, y'all
var currentQuestionIndex = 0;
var answersEl = document.getElementById("possible-answers");
var initialsBtn = document.getElementById("initials-submit")
var startBtn = document.getElementById("start-quiz");
var timerEl = document.getElementById("time");
var finalScore = document.getElementById("final-score");
var initials = document.getElementById("initials");
var choicesEl = document.getElementById("possible-answers");
var responseEl = document.getElementById("response");
 

//quiz questions and answers
var questions = [
  {
    questionTitle: "What is the sun?",
    possibleAnswers: [
      "a white dwarf star",
      "a yellow dwarf star",
      "a neutron star",
      "a black hole",
    ],
    correctAnswer: "a yellow dwarf star",
  },
  {
    questionTitle: "What are the 3 branches of government in the US?",
    possibleAnswers: [
      "legislative, executive, and judicial",
      "judicial, legislative, and other",
      "judicial, The Supreme Court, and President",
      "judicial, executive, and Congress",
    ],
    correctAnswer: "legislative, executive, and judicial",
  },
  {
    questionTitle: "What is Javascript?",
    possibleAnswers: [
      "the logic of the internet",
      "a programming language",
      "a pain in the butt",
      "all of the above",
    ],
    correctAnswer: "all of the above",
  },
  {
    questionTitle: "The A in HTML stands for:",
    possibleAnswers: ["array", "association", "activity", "What A?"],
    correctAnswer: "What A?",
  },
  {
    questionTitle: "Another question I need to come up with",
    possibleAnswers: ["option a", "option b", "option c", "option d"],
    correctAnswer: "option b",
  },
];

let seconds = 90;
//button to start quiz
startBtn.addEventListener("click", startQuiz);
{
}


//THEN a timer starts and I am presented with a question
//timer starts when I click start quiz button and first question appears

//function that starts the quiz by starting the timer and showing the questions
function startQuiz() {
  startTimer();
  startBtn.disabled = true;
  var questionsEl = document.getElementById("questions");
  //questionsEl.textContent = (currentQuestionIndex);
  questionsEl.removeAttribute("class");

  showQuestion();
}
//timer function
function startTimer() {
  const quizTimer = setInterval(() => {
    timerEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(quizTimer);
      console.log("Time is up!");
    } else {
   
      seconds--;
    }
  }, 1000);
}
choicesEl.addEventListener("click", questionClick);
//question function
function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("title");
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = '';
console.log("currentQuestion", currentQuestion.questionTitle)
    titleEl.append(currentQuestion.questionTitle);
  for (var i = 0; i < currentQuestion.possibleAnswers.length; i++) {
    var choice = currentQuestion.possibleAnswers[i];
    console.log("choice", choice)
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "possible-answers");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + "." + choice;
    
   choicesEl.appendChild(choiceNode);
  }
}
function questionClick(event){
  event.preventDefault();
  var buttonEl = event.target;
 
  var currentQuestion = questions[currentQuestionIndex].correctAnswer;
  var answerEl = document.getElementById("response");
  answerEl.textContent = currentQuestion.correctAnswer;
console.log(questions[currentQuestionIndex].correctAnswer);
  //unhide response element
  answerEl.removeAttribute("class");
  //right or wrong answer response
  if (buttonEl.value !==(questions[currentQuestionIndex].correctAnswer)) {
    //time penalty
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    //create an element for right/wrong feedback
    
    answerEl.textContent = "Incorrect";
  } else {
    answerEl.textContent = "Correct";
  }
//HOW DO I GO TO THE NEXT QUESTION
  currentQuestionIndex++;

 

  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();

  } else {
    showQuestion();
  }
};
//end the quiz
function quizEnd(){
    clearInterval(timerEl);
    var finalScore = document.getElementById("final-score");
    finalScore.removeAttribute("class");
    var yourScore = document.getElementById("score");
    yourScore.textContent = time;

}

function showScores() {
  var highScores = JSON.parse(localStorage.getItem("high-scores")) || [];

  for (var i= 0; i < highScores.length; i += 1) {
    var liEl = document.createElement('li');
    liEl.textContent = highScores[i].initials + "-" + highScores[i].score;
    var ulEl = document.getElementById('high-scores');
    ulEl.appendChild(liEl);
  }

}

showScores();
//  const highScores = JSON.stringify(score);
//if ()possible answers = correct answer
//display correct, go to next question

//if (questionClick===questions.correctAnswer) {
//penalize time, then next question, display incorrect
//} else {
  
//}
//title.textContent = currentQuestionIndex.questionTitle;
/* var questionObject = questions [currentQuestionIndex];
  var questionTitle = questionObject.question;
  var possibleAnswer1 = questionObject.possibleAnswers[0];
  var possibleAnswer2 = questionObject.possibleAnswers[1];
  var possibleAnswer3 = questionObject.possibleAnswers[2];
  var possibleAnswer4 = questionObject.possibleAnswers[3];
  var correctAnswer = questionObject.correctAnswer;
  var q1div = document.getElementById ("q1");
  var q2div = document.getElementById ("q2");
  var q3div = document.getElementById ("q3");
  var q4div = document.getElementById ("q4");
  q1div.textContent = questionObject.question;*/

//how access array?
//showQuestion();
//console.log("Show a question");

//JSON.parse() to store scores in local storage????

//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and score
//
