var express = require('express');
var router = express.Router();
var fs = require("fs");
var Client = require('node-rest-client').Client;


router.get('/', function(req, res) {
    res.send('invoke');
});

router.get('/issue', function(req, res) {
    var url="http://localhost:4000/channels/mychannel/chaincodes/mycc"
    var client = new Client();
    //get token
    var data=fs.readFileSync('token.txt');
    var token=data.toString();
    //record due time
    var jsStr=fs.readFileSync('duetime.json')
    if (jsStr==""){
        var jsObj={}
    }else{
        var jsObj=JSON.parse(jsStr)
    }
    if(req.query.BillInfoID in jsObj){
        res.send("Bill number has existed")
    }else{
        jsObj[req.query.BillInfoID]=req.query.BillInfoDueDate
    }
    fs.writeFile('duetime.json', JSON.stringify(jsObj),  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
    });
    //post data
    var args = {
        headers: {
            "authorization":"Bearer "+token,
            "content-type": "application/json"
        },
        data:JSON.stringify({
            "peers": ["peer0.org1.example.com","peer1.org1.example.com"],
            "fcn":"issue",
            "args":[JSON.stringify(req.query)]
        })
    };
    console.log(JSON.stringify([req.query]));
    // registering remote methods
    client.registerMethod("postMethod", url, "POST");

    client.methods.postMethod(args, function (data, response) {
        // parsed response body as js object
        res.send(JSON.stringify(data.toString()));
        console.log(data);

    });
});


router.get('/queryMyBill', function(req, res) {
    var url="http://localhost:4000/channels/mychannel/chaincodes/mycc"
    var client = new Client();
    var data=fs.readFileSync('token.txt');
    var token=data.toString();
    var args = {
        headers: {
            "authorization":"Bearer "+token,
            "content-type": "application/json"
        },
        data:JSON.stringify({
            "peers": ["peer0.org1.example.com","peer1.org1.example.com"],
            "fcn":"queryMyBill",
            "args":[req.cookies.user.id]
        })
    };
    // registering remote methods
    client.registerMethod("postMethod", url, "POST");

    client.methods.postMethod(args, function (data, response) {
        // parsed response body as js object
        res.send(data.toString());
        console.log(data);

    });
});

router.get('/queryMyWaitBill', function(req, res) {
    var url="http://localhost:4000/channels/mychannel/chaincodes/mycc"
    var client = new Client();
    var data=fs.readFileSync('token.txt');
    var token=data.toString();
    var args = {
        headers: {
            "authorization":"Bearer "+token,
            "content-type": "application/json"
        },
        data:JSON.stringify({
            "peers": ["peer0.org1.example.com","peer1.org1.example.com"],
            "fcn":"queryMyWaitBill",
            "args":[req.cookies.user.id]
        })
    };
    console.log(req.cookies.user.id);
    // registering remote methods
    client.registerMethod("postMethod", url, "POST");

    client.methods.postMethod(args, function (data, response) {
        // parsed response body as js object
        res.send(data.toString());
        console.log(data);

    });
});

router.get('/endorse', function(req, res) {
    var url="http://localhost:4000/channels/mychannel/chaincodes/mycc"
    var client = new Client();
    var data=fs.readFileSync('token.txt');
    var token=data.toString();
    if(req.query.status=="accept"){
        if(req.cookies.user.type=="teacher"){
            var args = {
                headers: {
                    "authorization":"Bearer "+token,
                    "content-type": "application/json"
                },
                data:JSON.stringify({
                    "peers": ["peer0.org1.example.com","peer1.org1.example.com"],
                    "fcn":"accept_teacher",
                    "args":[req.query.number,req.cookies.user.id,req.cookies.user.name]
                })
            };
        }else if(req.cookies.user.type=="school"){
            var args = {
                headers: {
                    "authorization":"Bearer "+token,
                    "content-type": "application/json"
                },
                data:JSON.stringify({
                    "peers": ["peer0.org1.example.com","peer1.org1.example.com"],
                    "fcn":"accept_school",
                    "args":[req.query.number,req.cookies.user.id,req.cookies.user.name]
                })
            };
        }else{
            res.send("!wrong user authority!")
        }
    }else{
        var args = {
            headers: {
                "authorization":"Bearer "+token,
                "content-type": "application/json"
            },
            data:JSON.stringify({
                "peers": ["peer0.org1.example.com","peer1.org1.example.com"],
                "fcn":"reject",
                "args":[req.query.number,req.cookies.user.id,req.cookies.user.name]
            })
        };
    }
    // registering remote methods
    client.registerMethod("postMethod", url, "POST");

    client.methods.postMethod(args, function (data, response) {
        // parsed response body as js object
        res.send(JSON.stringify(data.toString()));
        console.log(data);

    });
});


module.exports = router;
