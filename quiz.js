function Question (question, choices, answer){
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}

var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")  
];

function Quiz (questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkAnswer = function (userchoice) {
    if (userchoice === this.getQuestionByIndex().answer){
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isQuizEnded = function () {
    return this.questionIndex === this.questions.length
}

var quiz = new Quiz(questions);

function loadPage(){
   
    if(quiz.isQuizEnded()){
        showScore();
    }else{
        var questionelement = document.getElementById("question")
        questionelement.innerHTML = quiz.getQuestionByIndex().question;
    
        var options = quiz.getQuestionByIndex().choices;
    
        for(var i = 0; i < options.length; i++){
            var element =   document.getElementById("choice"+i)
            element.innerHTML = options[i];
            handleOptionButton(options[i], "btn" + i);
        }
        showProgress();
      
    }
}
function  showProgress() {
    var progressEl = document.getElementById("progress");
    progressEl.innerText = "Question " + (quiz.questionIndex + 1) + " of " +  quiz.questions.length;
}


function handleOptionButton(choice, id){
    var button = document.getElementById(id);
    button.onclick = function (){
        quiz.checkAnswer(choice);
        loadPage();
    }
}

function showScore () {
    let result = "<h1> Results is:</h1>";
    let percentage =  calcualtePercentage(quiz.score, quiz.questions.length)
    result += "<h2>Your score is: "+ quiz.score + ". </br>Your percentage is: "+ percentage + "%."+ "</h2>";
    var quizEl = document.getElementById("quiz").innerHTML = result;
}

function calcualtePercentage (score, total) {
    let percent = (score / total) * 100;
    return percent;
}

loadPage();