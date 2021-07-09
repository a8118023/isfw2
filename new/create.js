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
    var str = "<ul id='highScoresList'>"
    for (var i = 0; i < len; i++) {
        var object = objects[i];
        str += `<li class="high-score card">${object.name}</li>`
    }
    str += "</ul>"
    console.log(str);
    document.getElementById('result').innerHTML = str;
}