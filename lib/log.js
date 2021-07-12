var log = {};

log.logout = function () {
    // 指定されたキーがなければ、このメソッドは何もしない
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('password');
    location.href = 'index.html';
}

log.check = async function () {
    var id = localStorage.getItem('id');
    var password = localStorage.getItem('password')
    var sql = `select * from Users where id="${id}";`;
    var objects = await osql.connect(sql);
    
    if (objects.length <= 0 || objects[0].password != password.split("").reverse().join("")) {
        log.logout();
        location.href = 'index.html';
        window.alert("ログインしてください!");
        return;
    }
}

log.logged = async function () {
    // IDとパスワード入手
    var user_id = localStorage.getItem('id');
    var password = localStorage.getItem('password');
    if (user_id && password) {
        var sql = `select * from Users where id="${user_id}";`;
        var objects = await osql.connect(sql);
        // ユーザーIDとパスワードの確認、正しくなければ、ログインさせる。
        if (objects.length <= 0 || objects[0].password == password.split("").reverse().join("")) {
            location.href = 'top.html';
            window.alert("ログインしています!");
            return;
        } else {
            return;
        }
    }
}