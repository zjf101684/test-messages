// 存放和留言功能相关的路由

const path = require('path');
const express = require('express');
const moment = require('moment');
const artTemplate = require('art-template');


// 引入自定义的模块
const db = require(path.join(__dirname, 'db.js'));


// 注册过滤器
// template.defaults.imports.过滤器名字 = function(date, format){/*[code..]*/};
// 过滤器函数，第一个参数表示要处理的那个数据
artTemplate.defaults.imports.mytime = function(value){
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
};


// 创建路由对象 router
const router = express.Router();

// 监视请求
router.get('/message.html', (req, res) => {
    let fileName = path.join(__dirname, 'message.html');
    // sendFile 会根据文件路径，自动去读取内容，并把读取的结果响应给浏览器
    res.sendFile(fileName);

    // 判断，用户是否登录
    // let flag = req.session.isLogin ? true : false;

    // // 使用下面的方法，处理模板，并将是否登录当做数据交给模板
    // res.render(fileName, {
    //     isLogin: flag
    // });
});

// 监视ajax请求
router.get('/getMsg', (req, res) => {
    // 设置模块路径（li.html中只有循环的li，没有其他任何东西）
    let fileName = path.join(__dirname, 'li.html');
    // 读取数据表中的所有留言
    db.abcd('select * from msg', null, (err, result) => {
        if (err) throw err;
        // console.log(result);
        // result 就是从数据取出的数据，下面循环数据，处理时间为你想要的格式
        /* for (var i in result) {
            result[i].m_time = moment(result[i].m_time).format('YYYY-MM-DD HH:mm:ss')
        } */
        // render方法
        // 根据fileName去读取内容
        // 会将数据和html内容组合好
        // 会将组合好的结果，响应给浏览器
        res.render(fileName, {
            xyz: result
        });
    });
    
});

// 监视/login
router.post('/login', (req, res) => {
    // 接收提交过来的用户名和密码
    let user = req.body.u_name;
    let pwd = req.body.u_pwd;
    // 检测用户名密码是否正确
    let sql = 'select * from user where u_name=? and u_pwd=?';
    db.abcd(sql, [user, pwd], (err, result) => {
        if (err) throw err;
        // console.log(result);
        // 登录成功，将用户的信息存储到session中
        req.session.isLogin = true;
        req.session.userInfo = result[0]; // { u_id: 2, u_name: '亚索', u_pwd: '123' }
        res.send(result.length + ''); // 没有查到结果，返回0；查到结果，返回值肯定不为0
    });
});

// 监视/addMsg
router.post('/addMsg', (req, res) => {
    // 接收提交的留言和称呼
    // console.log(req.body); // { m_content: '56788' }
    // 提交的数据中，没有时间，所以得添加一个时间
    req.body.m_name = req.session.userInfo.u_name;
    req.body.m_time = moment().format('YYYY-MM-DD HH:mm:ss');
    // 将新的留言添加到数据库
    let sql = "insert into msg set ?";
    db.abcd(sql, req.body, (err, result) => {
        if (err) throw err;
        // console.log(result);
        // console.log(req.body)
        res.send(req.body);
    });
});

// 处理isLogin
router.get('/isLogin', (req, res) => {
    // 读取isLogin.html，并给模板分配数据
    // 判断，用户是否登录
    let flag = req.session.isLogin ? true : false;
    res.render(path.join(__dirname, 'isLogin.html'), {
        isLogin: flag
    });
})

// 导出路由模块
module.exports = router;