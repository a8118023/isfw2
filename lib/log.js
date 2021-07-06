var log = {};

log.logout = function () {
    // 指定されたキーがなければ、このメソッドは何もしない
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('password');
}

log.check = async function () {
    var id = localStorage.getItem('id');
    var password = localStorage.getItem('password')
    var sql = `select * from Users where id="${id}";`;
    var objects = await osql.connect(sql);
    
    if (objects.length <= 0 || objects[0].password != password.split("").reverse().join("")) {
        log.logout();
        location.href = 'login.html';
        window.alert("ログインしてください!");
        return;
    }
}