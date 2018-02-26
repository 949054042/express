/*有条件的话升级为egg*/
var express=require("express");
/*引入文件读写模块*/
var fs=require("fs");
/*引入日志中间件*/
var svgCaptcha = require('svg-captcha');
var winston=require("winston");
/*自定义不同级别的信息的颜色*/
winston.addColors({
  error:"red",
  warn:"yellow"
});
/*创建logger实例即自定义日志实例*/
var logger = new (winston.Logger)({
  /*指定记录方式*/
    transports: [
      new (winston.transports.Console)(),               //console.log
      new (winston.transports.File)({
        filename:__dirname+'/log/warning.log',
        name:"error",
        level:"error"
      }) ,     //写日志文件
      new (winston.transports.File)({
        filename:__dirname+'/log/info.log',
        name:"info",
        level:"info"
      })      //写日志文件
    ]
  });
  /*引入中间件即bodyparser解析表单上传的非file文件*/
var bodyParser=require("body-parser");
/*处理文件上传*/
var multer=require("multer");
/*引入cookie中间件以此来读写cookie*/
var cookieParser=require("cookie-parser");
var cp=require("cookie-session");
/*引入mysql底层驱动*/
var mysql=require("mysql");
/*实现model层即引入数据库操作中间件而不是直接去用mysql底层驱动*/
var seq=require("./model/goods.js");
var goods=seq.Goods;
var login=seq.Login;
/*引入jade模块以此来实现模板渲染*/
var jade=require("jade");
/*创建服务器实例*/
var app=express();
app.listen({
  host:"127.0.0.1",
  port:"8087"
},function(){
  console.log("------服务已经在8087端口启动")
})
/*设置静态文件的位置*/
app.use(express.static(__dirname+"/views"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cp({
 secret: 'captcha',//与cookieParser中的一致
 resave: true,
 saveUninitialized:true
}));
/*设置模板引擎为jade以及模板文件所在的目录*/
app.set("views",__dirname+"views");
app.set("view-engine","jade");
/*定义url所对应的操作*/
app.get("/",function(req,res){
  res.redirect("login.html")
  res.end();
});
app.get("/yz",function(req,res){
  var getCode = (req, res) => {
      var codeConfig = {
          size: 5,// 验证码长度
          ignoreChars: '0o1i', // 验证码字符中排除 0o1i
          noise: 2, // 干扰线条的数量
          height: 44
      }
      var captcha = svgCaptcha.create(codeConfig);
      if(req.session.captcha==null)
      {
        req.session.captcha=""
      }
      else {
        req.session.captcha = captcha.text.toLowerCase();
      }
      var codeData = {
          img:captcha.data
      }
      res.type('svg');
	     res.status(200).send(captcha.data);
  }
  getCode(req,res);
});
app.get("/yz2",function(req,res){
  if(req.session.captcha)
  {
    res.end("还在登陆期限内")
  }else {
    res.end("dengluyijingguoqi")
  }
})
app.post("/login",function(req,res){
  res.append("Content-Type","text/plain;charset=utf8");
    var user=req.body.name;
    var pass=req.body.pass;
    console.log(user)
    console.log(pass);
    (async function(){
      var p=await login.findAll({
        where:{
          user:user,
          password:pass
        }
      })
      return p
    })().then(function(result){
      console.log(result)
      if(result=pass)
      {
        res.end("登陆成功")
      }
    }).catch(function(e){
        res.end("登录失败")
    })
});
app.post("/register",function(req,res){
  res.append("Content-Type","text/plain;charset=utf8");
    var user=req.body.z_name;
    var pass=req.body.z_pass;
    (async function(){
      var p=await login.create({
          user:user,
          password:password
      })
      return p
    })().then(function(result){
      if(result=pass)
      {
        res.end("注册成功")
      }
    }).catch(function(e){
        res.end("注册失败")
    })
});
app.post("/goods",function(req,res){
  var num=req.body.num;
  var page=(req.body.page)*4
  var str="select * from goods limit "+page+","+(num+page)
  var client=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"pinduoduo"
  })
  client.connect();
  client.query(str,function(err,results,fileds){
    /*记录错误日志*/
    if(err)
    {
      logger.error(err,{
        pid:process.pid,
        timestamp:Date.now()
      })
    }
      res.json(results);
      res.end();
  })
});
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null,__dirname+'/views/uploads');
   },
   filename: function (req, file, cb) {
       cb(null, Date.now() + "-" + file.originalname);
   }
});

var upload = multer({storage:storage});
app.post("/img",upload.single('transport'),function(req,res){
  res.set({
    "Content-Type":"text/plain;charset=utf8"
  })
    res.end("成功了")
});
app.get("/goods_02",function(req,res){
  console.log(90);
  (async ()=>{
    var str=await goods.findAll({
        where:{
          price:19
        }
      })
  })().catch(function(e){
    console.log("")
  });
  try{
      res.append("Content-Type","text/plain;charset=utf8");
    if(req.cookies.name)
    {
      res.end("欢迎老客户")
    }
    else {
      res.cookie("name","xq",{
        "Catch-Control":"max-age:1000"
      });
      res.end("欢迎新用户");
    }
  }
  catch(e)
  {
    logger.info(e,{
      pid:process.pid,
      timestamp:Date.now()
    })
  }
});
app.get("/goods_03",function(req,res){
  res.append("Content-Type","text/html;charset=utf8");
  if(req.cookies.baidu)
  {
    res.end("您是认证用户欢迎光临")
  }
  else {
    res.cookie("baidu","baidu",{
      "Catch-Control":"max-age:1000"
    });
    res.end("<a href='http://www.baidu.com'>未登录请点击链接以完成登陆</a>")
  }
});
/*提供图片下载功能*/
app.get("/attach",function(req,res){
  res.attachment("aaa");
  res.sendFile(__dirname+"/views/goods/goods_01.png")
});
app.get("/error",function(){
  logger.remove(winston.transports.Console);
    logger.info(622345,{
      pid:process.pid,
      timestamp:Date.now(),
      remark:"this my mark"
    }),
    logger.error(1345,{
      pid:process.pid,
      timestamp:Date.now(),
      remark:"this my mark"
    })
});
app.get("/error2",function(){
  var options = {
    from: new Date - 24 * 60 * 60 * 1000,
    until: new Date,
    limit: 10,
    start: 0,
    order: 'desc',
    fields: ['12']
  };
  //
  // Find items logged between today and yesterday.
  //
  /*给logger添加事件处理*/
  logger.on('logging', function (transport, level, msg, meta) {
    console.log("捕获到了")
  });
/*logger具有数据查询功能*/
  logger.query(options, function (err, results) {
    if (err) {
      throw err;
    }

    console.log(results);
  });
})
