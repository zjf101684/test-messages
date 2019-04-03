function abcd(sql, val, fn) {
    const mysql = require('mysql');
    // 连接myql
    const conn = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'message'
    });
    conn.connect();
    // 执行查询操作
    conn.query(sql, val, fn);
    // 关闭连接
    conn.end();
}



// 导出模块
module.exports = {
    abcd
};
