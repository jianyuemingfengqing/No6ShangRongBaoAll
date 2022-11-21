
/* 运行js文件
function alert(str) {
    console.log(str);
}
alert("hello node")*/

// fs读取文件
/*
const fs = require('fs');

fs.readFile('./es6.html',function (err, data) {
    if (err) {
        throw err; //如果文件不存在就报错
    }
    console.log(data.toString());
})*/

// 创建服务端
const http = require('http'); // http模块返回的是 json

http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
    res.end('<a href="http://www.atguigu.com">点我</a>')
}).listen(10000); // 监听10000端口

console.log('服务器启动成功: http://localhost:10000')