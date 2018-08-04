var express = require('express');
var router = express.Router();
var fs = require("fs");
var Client = require('node-rest-client').Client


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');

});
router.get('/index', function(req, res, next) {
    if(req.cookies.user!=null){
        res.render(req.cookies.user.type,{user:req.cookies.user});
    }else{
        res.render('index');
    }

});

router.get('/hello', function(req, res) {
    res.render('hello');
});

router.get('/login', function(req, res) {
    var jsObj=JSON.parse(fs.readFileSync('users.json'))
    if((req.query.username in jsObj)&& jsObj[req.query.username].password==req.query.password){
        res.cookie("user", {username: req.query.username,id:jsObj[req.query.username].id,name:jsObj[req.query.username].name,type:jsObj[req.query.username].type}, {maxAge: 600000 , httpOnly: false});
        res.redirect('index');
    }else{
        res.send("用户名或密码错误");
    }

});

router.get('/register', function(req, res) {
    var jsObj=JSON.parse(fs.readFileSync('users.json'))
    jsObj[req.query.username]=req.query
    fs.writeFile('users.json', JSON.stringify(jsObj),  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
    });
    res.cookie("user", {username: req.query.username,id:jsObj[req.query.username].id,name:jsObj[req.query.username].name,type:jsObj[req.query.username].type}, {maxAge: 600000 , httpOnly: false});
    res.redirect('index');
});

router.get('/logout', function(req, res) {
    res.clearCookie('user');
    res.redirect('index');
});

router.get('/login', function(req, res) {
    res.send(req.query);
});

router.get('/login', function(req, res) {
    res.send(req.query);
});
module.exports = router;
