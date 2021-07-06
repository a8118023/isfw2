var log = {};

log.logout = function () {
    // 指定されたキーがなければ、このメソッドは何もしない
    localStorage.removeItem('name');
    localStorage.removeItem('id');
}

log.check = async function () {
    var name = localStorage.getItem('id');
    var sql = `select * from Users where id="${name}";`;
    var objects = await osql.connect(sql);
    
    if (objects.length <= 0) {
        location.href = 'login.html';
        window.alert("ログインしてください!");
        return;
    }
}