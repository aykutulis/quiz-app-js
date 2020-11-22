//Question Constructer
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

//Question Prototype
Question.prototype.checkAnswer = function (answer) {
    return answer === this.answer;
}

//Quiz Constructer
let Quiz = function (questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

//Question Prototypes
//Get Question
Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex];
}
//Quiz is Finish
Quiz.prototype.isFinish = function () {
    return this.questions.length === this.questionIndex;
}
//Quiz Guess
Quiz.prototype.guess = function (answer) {
    let question = this.getQuestion();
    if (question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

//Questions
let q1 = new Question("What's the best programming language?", ["C#", "Java", "JavaScript", "Python"], "JavaScript");
let q2 = new Question("What's the most popular programming language?", ["C#", "C++", "JavaScript", "Python"], "JavaScript");
let q3 = new Question("What's the best modern programming language?", ["Nodejs", "Java", "Django", "Flutter"], "Nodejs");
let questions = [q1, q2, q3];

//Start Quiz
let quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
    if (quiz.isFinish()) {
        showScore();
    } else {
        var question = quiz.getQuestion();
        var choices = question.choices;

        $('#question').html(question.text);

        for (let i = 0; i < choices.length; i++) {
            var element = $(`#choice${i}`);
            element.html(choices[i]);
            guess('#btn' + i, choices[i]);
        }
        showProgress();
    }
}
function guess(id, guess) {
    var btn = jQuery(id);
    btn.off().click(function () {
        quiz.guess(guess);
        loadQuestion();
        console.log(id);
    });
}

function showScore() {
    $('.card-body').html(`<h2>Score: </h2><h4>${quiz.score}</h4>`);
}

function showProgress() {
    let totalQuestions = quiz.questions.length;
    let currentQuestion = quiz.questionIndex + 1;
    $('#progress').html(`${currentQuestion}/${totalQuestions}`);
}