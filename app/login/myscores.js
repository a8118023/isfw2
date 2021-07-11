var timer;
var myScoresList = document.getElementById(" myScoresList");
var userId = localStorage.getItem('id')

$().ready(function () {
    init();
})


function init() {
    buttonPressed();
}

async function buttonPressed() {
    // ここを考えていく
    var sql = `select name, test_name, score, date from (Scores inner join Tests on Tests.test_id = Scores.test_id) inner join  Classes on Tests.class_id = Classes.id where Tests.user_id = "${userId}"`;
    console.log(sql);
    var objects = await osql.connect(sql);
    var str = '';
    str += '<table>'
    str += '<tr>';
    str += '<th>Class</th>';
    str += '<th>Test</th>';
    str += '<th>Score</th>';
    str += '<th>DateTime</th>'
    str += '</tr>'
    var len = objects.length;
    for (var i = 0; i < len; i++) {
        var object = objects[i];
        str += '<tr>';
        for (key in object) {
            var value = object[key];
            str += '<td>';
            str += value;
            str += '</td>';
        }
            str += '</tr>';
    }
    str += '</table>'
    document.getElementById('result3').innerHTML = str;
}