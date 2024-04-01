const express=require("express")  //导入express
require('express-async-errors');
const bodyParser = require('body-parser')   //处理post表单数据
const session = require('express-session')
const ejs=require('ejs')
const fs=require("fs")
var md5 = require('md5-node');
var time=require("./Date.js")
const sql=require("./database.js")  
const getBotAns=require("./chat.js")
const app=express()         //创建服务器实例

//允许跨域
const cors = require('cors')
app.use(cors())

//使用随机字符串
const stringrandom=require("string-random")
const { encode } = require("punycode")
const { json } = require("body-parser")
const secretkey=stringrandom(25)

const source_dir=__dirname

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now());
    }
}

app.use('/static',express.static('static',options))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req,res,next){
    tt=time.get_now();
    console.log(tt+"  "+req.ip+"  "+req.path);
    next();
})
app.use(session({
    secret :  secretkey, // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 15, // 设置 session 的有效时间，单位毫秒
    },
}))

app.get("/user_info",async function(req,res){
    if(req.session.IsLogin){
        let result=await sql("select * from Users where UID=?",req.session.username)
        if(result.length==0){
            res.json({IsLogin:0})
        }
        else{
            var info=result[0]
            res.json({
                IsLogin:1,
                name:info['NAME'],
                sex:info['SEX'],
                _class:info['_CLASS'],
                birth:time.D2str_(info['BIRTH']),
                academy:info['ACADEMY'],
                avatar:info['AVATAR']
            })
        }
    }
    else{
        res.json({IsLogin:0})
    }
})

app.get('/chat',function(req,res){
    res.sendFile(source_dir+"/templates/chat.html")
})

app.post('/bot',async(req,res)=>{
    var messages=JSON.parse(req.body.messages)
    let result=await getBotAns(messages);
    // console.log(username,passward,result)
    if(result=="error"){
        res.json({errcode:-101,result:"发送错误"})
    }
    else{
        res.json({errcode:0,result:result})
    }
})

app.get('/',function(req,res){
    res.sendFile(source_dir+"/templates/index_v1.html")
})

app.get('/demo',function(req,res){
    //res.sendFile()
    num=req.query.page
    if(!num)
        num=1;
    data=readjson("./static/news/"+num+".json")
    ejs.renderFile("./demo.html",{data:data},function(err, str) {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(str);
            res.end();
        }
    })
})
app.get('/news',function(req,res){
    data=readjson("./static/news/news_list.json")
    res.json(data)
})

app.get('/login',function(req,res){
    res.sendFile(source_dir+"/templates/login.html")
})

app.post('/auth',async(req,res)=>{
    var username=req.body.username
    var passward=md5(req.body.password)
    let result=await sql("select PASSWORD,ISADMIN from Users where UID=?",username)
    console.log(username,passward,result)
    if(result.length==0){
        res.json({errcode:400,msg:"无该用户"})
    }
    else if(result[0]['PASSWORD']!=passward){
        res.json({errcode:401,msg:"密码错误"})
    }
    else{
        req.session.isadmin=result[0]['ISADMIN']
        req.session.username=username;
        req.session.IsLogin=true;
        if(req.session.isadmin==0)
            res.json({errcode:0,msg:"success"})
        else
            res.json({errcode:402,msg:"管理员界面还未开发"})
    }
})

app.use(function(req,res,next){
    if(req.session.IsLogin)
        next();
    else{
        res.redirect("/login")
    }
})

app.get('/profile',function(req,res){
    res.sendFile(source_dir+"/templates/profile.html")
})

app.get('/setting',function(req,res){
    res.sendFile(source_dir+"/templates/setting.html")
})

app.get('/application',function(req,res){
    res.sendFile(source_dir+"/templates/application.html")
})




/*app.use((err, req, res, next) => {
    // 这次错误是由 token 解析失败导致的
    res.send({
      status: 500,
      message: '未知的错误',
    })
  })
*/
app.listen(3333)

function readjson(path){
    const data=fs.readFileSync(path,'utf-8')
    return JSON.parse(data)
}