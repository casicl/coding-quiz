//GIVEN I am taking a code quiz
//WHEN I click the start button

//global variables, y'all
var currentQuestionIndex = 0;
var answersEl = document.getElementById("possible-answers");
var initialsBtn = document.getElementById("initials-submit");
var startBtn = document.getElementById("start-quiz");
var timerEl = document.getElementById("time");
var finalScore = document.getElementById("final-score");
var initialsEl = document.getElementById("initials");
var choicesEl = document.getElementById("possible-answers");
var responseEl = document.getElementById("response");
var scoreEl = document.getElementById("score");
// let quizTimer
 

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
    questionTitle: "The only winning move is:",
    possibleAnswers: ["to cheat", "not to play", "to go first", "to beat everyone else"],
    correctAnswer: "not to play",
  },

  {
    questionTitle: "Another question I need to come up with:",
    possibleAnswers: ["option A", "option B", "option C", "option C"],
    correctAnswer: "option C",
  },
];

let seconds = 60;
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
   quizTimer = setInterval(() => {
    timerEl.textContent = seconds;
    if (seconds < 1) {
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
  let newtime=parseInt(time.textContent)

  //right or wrong answer response
  if (buttonEl.value !==(questions[currentQuestionIndex].correctAnswer)) {
    //time penalty
    newtime -= 10;
    console.log("newtimeis",newtime)
    timerEl.textContent= newtime.toString();

    //create an element for right/wrong feedback
    answerEl.textContent = "Incorrect";
  } else {
    answerEl.textContent = "Correct";
  }

//HOW DO I GO TO THE NEXT QUESTION
  currentQuestionIndex++;

 

  if (newtime <= 0 || currentQuestionIndex === questions.length-1) {
    quizEnd();

  } else {
    showQuestion();
  }
};
//end the quiz
function quizEnd(){
    clearInterval(quizTimer);
    var finalScore = document.getElementById("final-score");
    finalScore.removeAttribute("class");
    var yourScore = document.getElementById("score");
    yourScore.textContent = timerEl.textContent;
   

}
initialsBtn.addEventListener("click", submitScore);
function submitScore(){
  //collect the initials
  var initials = initialsEl.value.trim();
  console.log("******initials", initialsEl.value);
  // window.localStorage.setItem("initals", JSON.stringify("initials"))
  //collect the final score
  var highScores = JSON.parse(window.localStorage.getItem("score")) || [];
  console.log("****highscore", highScores)
  // setScore(finalScore, initials);

console.log("********timeElement", document.getElementById("time").textContent)
  var newScore = {
//if initials are in the object, how to handle them, add new game/multiple score
    score: document.getElementById("time").textContent,
    initials: initials,
  };
  highScores.push(newScore);
  window.localStorage.setItem("score", JSON.stringify(highScores));
  showScores();
  
}
function getScores(){
 return   JSON.parse(localStorage.getItem("score")) || [];

};

function showScores() {
  //get scores from local storage
  var highScores = JSON.parse(window.localStorage.getItem("score")) || [];
  console.log("****highscore 2", highScores)
  //create elements for scores
  //append to high scores list ul element

  for (var i= 0; i < highScores.length; i += 1) {
    var liEl = document.createElement('li');
    liEl.textContent = highScores[i].initials + "-" + highScores[i].score;
    var ulEl = document.getElementById('high-scores');
    ulEl.appendChild(liEl);
  }

}
function setScore(finalScore,initials){
const currentLeaders=getScores()
 var showScores = JSON.parse(window.localStorage.getItem("high-scores"));
//parse the data from local storage

//optionally check if there is more than five leaders and see if your score should even be on the leaderboard
//if it is higher then look into a method called splice
//add the new data tothe arar/obj/whatevr

//set local storage with the new data

}
showScores();


//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and score
//
