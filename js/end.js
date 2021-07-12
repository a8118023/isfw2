const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const userId = localStorage.getItem('id')
const testId = localStorage.getItem('testId')

$(document).ready(function () {
    init();
    log.check();
});

function init() {
    var name = localStorage.getItem('name');
    document.getElementById('top-name').innerHTML = `Hello <span class="name-color">${name}</span>`;
    var str = "Score ";
    str += mostRecentScore;
    finalScore.innerText = str;
    console.log(new Date());
}

async function saveScore() {
    if (mostRecentScore != "undefined") {
        var sql = `insert into Scores (user_id, test_id, score) values ("${userId}", "${testId}", "${mostRecentScore}")`
        await osql.connect(sql);
        alert("保存に成功しました")
        saveScoreBtn.setAttribute("disabled", true);
        } else {
        alert("スコアが見つかりません")
    }
}