const highScoresList = document.querySelector('#highScoresList')
// ここで取得できているはず
const highScores = JSON.parse(localStorage.getItem('highScores')) || []


highScoresList.innerHTML =
    highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')