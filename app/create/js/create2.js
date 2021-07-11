var timer;
const class_id = localStorage.getItem('classId')
const test_name = document.querySelector('#test_name')
const user_id = localStorage.getItem('id')
const saveScoreBtn = document.querySelector('#saveTestBtn')

$().ready(function () {
    init();
})

$(document).ready(function () {
    if (timer) { return; }
    timer = setInterval(update, 1000);
});


function init() {
    var className = localStorage.getItem('className');
    document.getElementById('class_title').innerHTML = className;
}

test_name.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !test_name.value;
})


async function buttonPressed() {
    if (class_id != "undefined") {
        var sql = `insert into Tests (user_id, class_id, test_name) values("${user_id}", "${class_id}", "${test_name.value}");`;
        await osql.connect(sql);
        } else {
        alert("ClassIDが見つかりません")
    }
}

async function update() {
    var sql = `select * from Users
    inner join Tests on Users.id=Tests.user_id
    where Tests.class_id = '${class_id}';`;
    var objects = await osql.connect(sql);
    var len = objects.length;
    var str = ""
    for (var i = 0; i < len; i++) {
        var object = objects[i];
        str += `<div class="card">
                <div class="between-space">
                    <div class="course-creater">
                        <div class="course" onclick="buttonSelected('${object.test_id}', '${object.test_name}')">${object.test_name}</div>
                        <div class="creater">作成者：${object.name}</div>
                    </div>
                    <div class="delete" onclick="buttonDeleted('${object.test_id}')">delete</div>
                </div>
            </div>
        </div>`
    }
    document.getElementById('result').innerHTML = str;
}

async function buttonDeleted(testId) {
    if (window.confirm("削除しますか？")) {
        var sql = `delete from Tests where id = '${testId}'`;
        await osql.connect(sql);
    }
}

function buttonSelected(testId, testName) {
    localStorage.setItem('testId', testId);
    localStorage.setItem('testName', testName);
    location.href = 'create3.html';
}