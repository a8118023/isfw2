const saveScoreBtn = document.querySelector('#saveScoreBtn')
// ファイナルスコア
const finalScore = document.querySelector('#finalScore')
// 直近のやつ
const mostRecentScore = localStorage.getItem('mostRecentScore')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORES = 5

function OnLogoutClick(){
    log.logout();
    location.href = '../../login/index.html';
}

$(document).ready(function () {
    init();
});

function init() {
    var name = localStorage.getItem('name');
    document.getElementById('top-name').innerHTML = `Hello <span class="name-color">${name}</span>`;
    var str = "Score ";
    str += mostRecentScore;
    finalScore.innerText = str;
}

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)
    
    highScores.sort((a, b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    // ハイスコアを記録する
    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('ready.html')
}