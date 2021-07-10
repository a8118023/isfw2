// セレクタの選択
// 質問が入る場所
const question = document.querySelector('#question');
// 答えが入る場所
const choices = Array.from(document.querySelectorAll('.choice-text'));
// 知らん
const progressText = document.querySelector('#progressText');
// スコアの数字を切り替える用
const scoreText = document.querySelector('#score');
// 進捗度(かっこいいから欲しい)
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is 2 + 2',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'What is 5 + 5',
        choice1: '2',
        choice2: '10',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'What is 3 + 5',
        choice1: '2',
        choice2: '4',
        choice3: '8',
        choice4: '17',
        answer: 3,
    },
    {
        question: 'What is 6 + 2',
        choice1: '2',
        choice2: '4',
        choice3: '3',
        choice4: '9',
        answer: 4,
    },
]

// ここまで問題なし

const SCORE_POINST = 100

// マックスの問題数
const MAX_QUESTIONS = 4

// (1) 最初に行う処理
startGame = () => {
    // 上記にある
    questionCounter = 0
    score = 0
    // 上のquestions配列の型が入っています
    availableQuestions = [...questions]
    getNewQuestion()
}

// 上に依存
getNewQuestion = () => {

    // 配列の長さが0じゃないか、もしくはカウンターが最大よりも大きい場合、
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        // ストレージにscoreを保存する
        localStorage.setItem('mostRecentScore', score)
        // assingメソッドは引数に指定したURLに遷移する
        return window.location.assign('end.html')
    }

    // カウンター増加
    questionCounter++

    // 現在のカウンターについて
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    // プログレスバーの長さをここで指定している
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    // availableQuestionsには質問の配列が入ってます。ランダムに表示します。
    // questionの値に乱数が入る
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    // 配列の指定をして、currentQuestionに入れます
    // currentQuestionはグローバルで指定しています。
    currentQuestion = availableQuestions[questionIndex]
    
    // 質問文が入る場所に配列の中にある質問文を打ち込む
    question.innerText = currentQuestion.question

    // 各答えのばーに入れます。
    choices.forEach(choice => {
        // datanumberから取得します
        const number = choice.dataset['number']
        // currentQuestionのchoiceに文字列にnumberつけて、該当するものをinnerTextに入れます。
        choice.innerText = currentQuestion['choice' + number]
    })

    // spliceは配列の内容を変更する
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

    // 乱数で指定した箇所を削除
    availableQuestions.splice(questionIndex, 1)
    // acceptingAnswers初期化
    acceptingAnswers = true
}


// (1)以降はこっちのみ
choices.forEach(choice => {
    // クリックしたときの処理
    choice.addEventListener('click', e => {
        
        // acceptingAnswersがFalseなら...何も
        if (!acceptingAnswers) return
        
        // 最初はTrueなので
        acceptingAnswers = false
        // 選ばれしチョイス
        const selectedChoice = e.target
        // 多分、本当の答えかな
        const selectedAnaswer = selectedChoice.dataset['number']
        
        let classToApply = selectedAnaswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            // 単純にスコアあげるだけ
            // 100ポイントアップする
            incrementSocre(SCORE_POINST)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementSocre = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

// 参考
// https://www.youtube.com/watch?v=f4fB9Xg2JEY&t=3234s