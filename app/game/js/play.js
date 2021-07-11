var elementQuestion = document.getElementById('question');
var buttonSelect = document.getElementById('buttonSelect');
var scoreText = document.getElementById('score')
var testId = localStorage.getItem('testId');
const progressBarFull = document.querySelector('#progressBarFull');
var currentQuestion = ""
var currentAnswer = ""
var availableQuestions = [];
var count = 0;
var score = 0;
var max_questions = 0;
var answer = false;


$(document).ready(function () {
    init();
});

async function init() {
    // ログイン表示
    var name = localStorage.getItem('name');
    document.getElementById('top-name').innerHTML = `Hello <span class="name-color">${name}</span>`;
    // 問題取得
    availableQuestions = await testDisplay();
    max_questions = availableQuestions.length - 1;
    currentQuestion = String(availableQuestions[count].question)
    currentAnswer = String(availableQuestions[count].answer);
    var str = "問題：</br>" + currentQuestion;
    elementQuestion.innerHTML = str;
}

// 問題配列を作成して渡す関数
async function testDisplay() {
    const questions = []
    var sql = `select * from Questions where Questions.test_id = '${testId}'`;
    var objects = await osql.connect(sql);
    var len = objects.length;
    for (var i = 0; i < len; i++) {
        var object = objects[i];
        var question = {}
        question.question = object.question;
        question.answer = object.answer;
        questions.push(question);
    }
    return questions;
}

// 答えの切り替え
function displayAnswer() {
    if (answer) {
        var str = "問題：</br>"
        str += currentQuestion
        elementQuestion.innerHTML = str;
        answer = false;
    } else {
        var str = "答え：</br>"
        str += currentAnswer
        elementQuestion.innerHTML = str;
        answer = true;
    }
}

// 次の問題へ
function correctSelected() {
    if (count < max_questions) {
        console.log(count)
        count++;
        score++;
        scoreText.innerHTML = score;
        progressBarFull.style.width = `${(count / max_questions) * 100}%`
        currentQuestion = String(availableQuestions[count].question);
        elementQuestion.innerHTML = "問題：</br>" + currentQuestion;
        currentAnswer = String(availableQuestions[count].answer);
    } else {
        score++;
        localStorage.setItem("mostRecentScore", score);
        location.href = "../html/end.html";
    }
}

function wrongSelected() {
    if (count < max_questions) {
        console.log(count);
        count++;
        progressBarFull.style.width = `${(count/max_questions) * 100}%`
        currentQuestion = String(availableQuestions[count].question);
        elementQuestion.innerHTML = "問題：</br>" + currentQuestion;
        currentAnswer = String(availableQuestions[count].answer);
    } else {
        localStorage.setItem("mostRecentScore", score);
        location.href = "../html/end.html";
    }
}

function OnLogoutClick() {
    log.logout();
    location.href = '../../login/index.html';
}