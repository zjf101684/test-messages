// node 核心模块
const path = require('path');

// 第三方模块
const express = require('express');
const template = require('express-art-template');

const bodyParser = require('body-parser');
const session = require('express-session');


// 创建服务器
const app = express();

// 处理静态资源
app.use('/assets/', express.static(path.join(__dirname, 'assets')));
// 指定后缀为html的模板，使用template来处理
app.engine('html', template);

// 中间件bodyParser，会将请求体的内容放到req中
app.use(bodyParser.urlencoded({extended: false}));

// 使用session，必须将session函数注册为中间件
app.use(session({
    secret: '4ey32erfyf3fgpg',   //加密字符串。 使用该字符串来加密session数据，自定义
    resave: false,               //强制保存session即使它并没有变化
    saveUninitialized: false     //强制将未初始化的session存储。当新建了一个session且未
    // cookie: {maxAge: 3600000}							 //设定属性或值时，它就处于未初始化状态。
}));




/* artTemplate.defaults.imports.xing = function (val) {
    return '%' + val + '%';
} */


// 加载路由模块
const router = require(path.join(__dirname, 'liuyan.js'));
// 将router注册成中间件
app.use(router);

// app.get('/xyz', (req, res) => {
    // console.log(moment().format('YYYY-MM-DD hh:mm:ss'));

    // 格式化当前的时间
    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
    // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

    // 将一个已有的时间，格式化成固定格式
    // moment函数的参数 是一个已经存在的时间
    // format函数的参数，表示你想要的时间格式
    // console.log(moment('2018-02-23T14:00:10.000Z').format('YYYY-MM-DD HH:mm:ss'))
// });
app.get('/aaa', () => {
    console.log(module.paths);
})

app.listen(3000, () => console.log('开启成功'));