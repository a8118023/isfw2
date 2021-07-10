var timer;
const class_name = document.querySelector('#class_name')
const saveScoreBtn = document.querySelector('#saveScoreBtn')

$(document).ready(function () {
    if (timer) { return; }
    timer = setInterval(update, 1000);
});

async function buttonPressed() {
    if (class_name) {
        console.log(class_name);
        var sql = 'insert into Classes (name) values("' + class_name.value + '")'
        await osql.connect(sql);
        document.getElementById('error').innerHTML = "sucess!";
        } else {
        document.getElementById('error').innerHTML = "error!";
    }
}

class_name.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !class_name.value;
})

async function update() {
    var sql = 'select * from Classes';
    var objects = await osql.connect(sql);
    var len = objects.length;
    var str = ""
    for (var i = 0; i < len; i++) {
        var object = objects[i];
        str += `<div class="card">
        <div class="between-space">
            <div class="course"
                onclick="buttonSelected('${object.id}', '${object.name}')">
                授業名：</br>${object.name}
            </div>
            <div class="delete" 
                onclick="buttonDeleted('${object.id}')">
                delete
            </div>
        </div>
    </div>`
    }
    document.getElementById('result').innerHTML = str;
}

async function buttonDeleted(classId) {
    if (window.confirm("削除しますか？")) {
        var sql = `delete from Classes where id = '${classId}'`;
        await osql.connect(sql);
    }
}

async function buttonSelected(classId, className) {
    localStorage.setItem('classId', classId);
    localStorage.setItem('className', className);
    location.href = 'create2.html';
}