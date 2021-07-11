var timer;
const question = document.querySelector('#question')
const answer = document.querySelector('#answer')
const test_id = localStorage.getItem('testId')
const saveTestBtn = document.querySelector('#saveTestBtn')

$().ready(function () {
    init();
})

$(document).ready(function () {
    if (timer) { return; }
    timer = setInterval(update, 3000);
});


function init() {
    const class_name = localStorage.getItem('className')
    const test_name = localStorage.getItem('testName')
    document.getElementById('class_title').innerHTML = "Class：" + class_name;
    document.getElementById('test_title').innerHTML = "Test：" + test_name;
}

// 表示する関数を持ってくる
// 新規作成ボタンが一番下にあるので、
// クリックしたら、問題作成画面へ飛ぶ

answer.addEventListener('keyup', () => {
    if (question.value && answer.value) {
        saveTestBtn.disabled = false;
    } else {
        saveTestBtn.disabled = true;
    }
})


async function buttonPressed() {
    // test_idは必ず必要です
    if (test_id != "undefined") {
        var sql = `insert into Questions (test_id, question, answer) values("${test_id}", "${question.value}", "${answer.value}");`;
        await osql.connect(sql);
        } else {
        alert("testIDが見つかりません")
    }
}

async function update() {
    // これQuestions
    var sql = `select * from Questions where Questions.test_id = '${test_id}'`;
    var objects = await osql.connect(sql);
    var len = objects.length;
    var str = ""
    for (var i = 0; i < len; i++) {
        var object = objects[i];
        str += `<div class="card">
        <div class="between-space">
            <div class="card-question">
                ${object.question}
            </div>
            <div class="delete" onclick="buttonDeleted('${object.id}')">
                delete
            </div>
        </div>
        <div class="card-answer">
            答え：</br>${object.answer}
        </div>
    </div>`
    }
    document.getElementById('result').innerHTML = str;
}

async function buttonDeleted(questionId) {
    if (window.confirm("削除しますか？")) {
        var sql = `delete from Questions where id = '${questionId}'`;
        await osql.connect(sql);
        alert("成功しました")
    }
}