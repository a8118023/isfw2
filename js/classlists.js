const class_name = document.querySelector('#class_name')
const saveScoreBtn = document.querySelector('#saveScoreBtn')

$(document).ready(function () {
    init();
    log.check();
    osql.requireLogin();
});

function init() {
    classDisplay();
    var name = localStorage.getItem('name');
    document.getElementById('top-name').innerHTML = `Hello <span class="name-color">${name}</span>`;
}

async function classDisplay() {
    var sql = 'select * from Classes';
    var objects = await osql.connect(sql);
    var len = objects.length;
    var str = ""
    for (var i = 0; i < len; i++) {
        var object = objects[i];
        str += `<div class="card">
        <div class="course"
            onclick="buttonSelected('${object.id}')">
            授業名：</br>${object.name}
        </div>
    </div>`
    }
    document.getElementById('result').innerHTML = str;
}

async function buttonSelected(classId) {
    var sql = `select * from Users
    inner join Tests on Users.id=Tests.user_id
    where Tests.class_id = '${classId}';`;
    var objects = await osql.connect(sql);
    var len = objects.length;
    if (!len) {
        alert("テストが作られてないみたいです...")
    }
    var str = ""
    for (var i = 0; i < len; i++) {
        var object = objects[i];
        str += `<div class="card">
        <div class="course-creater">
        <div class="course" onclick="buttonNext('${object.test_id}', '${object.test_name}')">${object.test_name}</div>
        <div class="creater">テスト作成者：${object.name}</div>
        </div>
        </div>
    </div>`
    }
    document.getElementById('result2').innerHTML = str;
}

function buttonNext(testId, testName) {
    localStorage.setItem('testId', testId);
    localStorage.setItem('testName', testName);
    location.href="ready.html"
}