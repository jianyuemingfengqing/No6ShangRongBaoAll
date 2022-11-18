// 变量
/*
console.log(a)
{
    var a = 'xxx';
    a = 13;
    var a = 'yyy';
}*/

/*const arr = [1,2,3,4,5];
// arr = [1,2,3,4,5]
arr[0] = 'zhangtao';
console.log(arr);*/

/*
let name = '锋哥';
let age = 37;
let str1 = '欢迎：' + name + ' ,今年' + age + ' 岁';
let str2 = "欢迎：" + name + " ,今年" + age + " 岁";
console.log(str1, str2)*/

/*
let name = '锋哥';
let age = 37;
let str3 = `欢迎：` + name + ` ,今年` + age + ` 岁`;
console.log(str3)

let str4 = `欢迎${name}，今年${age}岁`;
console.log(str4)

let str5 = `function a(){
    hehe...age. 
}`

console.log(str5)*/

// 函数
/*
function sum(a=100,b=1000){ //当未传参(未传参和传入undefined)时才会使用默认值
    return a+b;
}

// 如果不传参：默认 sum函数中的a和b默认值都是undefined  NaN
console.log(sum())//NaN：
console.log(sum(1))//NaN:
console.log(sum(1,1))//2
console.log(sum(1,null))//1   null值数字计算时当做0使用
console.log(sum(1,true))//2  true1  false0
console.log(sum(1,''))// '1'  字符串拼接
console.log(sum(1,undefined))*/

// 对象
/*let username = 'Tom'
let age = 2
let sing = function () {
    console.log('I love Jerry')
}*/
/*// 传统
let person1 = {
    username: username,
    age: age,
    sing: sing,
}
console.log(person1)
person1.sing()*/

/*// ES6：这样的书写更加简洁
let person2 = {
    age,
    username,
    sing,
}
console.log(person2)
person2.sing()*/

/*//对象拷贝: 引用传递  修改一个对象的属性值 另一个对象的属性值也改变了
let obj3 = {
    username
}
let obj4 =obj3;
obj4.username = 'pangju'
console.log(obj3)
console.log(obj4)

//将obj4 的属性和值一个个的设置给obj5
let obj5 = {...obj4}
obj5.username = 'daweige'
console.log(obj4)
console.log(obj5)*/

// 解构赋值
/*
// 数组解构
let arr = ['xf',12,44,true];

let [a,b,c,d] = arr;
console.log(a,b,c,d);
*/
/*
// 对象解构
let obj = {
    username: '益丰',
    age: 39,
    info() {
        console.log('影帝desu');
    }
};

let {
    username, age, info, salary = 500000
} = obj;

console.log(username, age, info, salary);*/

// 函数解构

function conn({
                  host,
                  username,
                  password,
                  schema,
                  port = 6379
              }) {
    console.log(host, port, username, password)
}

conn({
    host: '192.168.1.170',
    username: 'root',
    password: '123456',
    schema: 'redis://'
})