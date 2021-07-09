const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
// ファイナルスコアエラー
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')


const highScores = JSON.parse(localStorage.getItem('highScores')) || []


const MAX_HIGH_SCORES = 5

// 本来ここで入る
finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})


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