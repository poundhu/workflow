var express = require('express');
var router = express.Router();
var fs = require("fs");
var Client = require('node-rest-client').Client;


router.get('/', function(req, res) {
    res.render('admin');
});

router.get('/getToken', function(req, res) {
    var url="http://localhost:4000/users"
    var client = new Client();
    var args = {
        data: 'username=root&orgName=Org1',
        headers:{"content-type": "application/x-www-form-urlencoded"}
    };
    // registering remote methods
    client.registerMethod("postMethod", url, "POST");

    client.methods.postMethod(args, function (data, response) {
        // parsed response body as js object
        res.send(data.message);
        console.log(data);
        fs.writeFile('token.txt', data.token,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
        });
    });
});

router.get('/createChannel', function(req, res) {
    var url="http://localhost:4000/channels"
    var client = new Client();
    var data=fs.readFileSync('token.txt');
    var token=data.toString();
    var args = {
        headers: {
            "authorization":"Bearer "+token,
            "content-type": "application/json"
        },
        data:JSON.stringify({
            "channelName":"mychannel",
            "channelConfigPath":"../artifacts/channel/mychannel.tx"
        })
    };
    // registering remote methods
    client.registerMethod("postMethod", url, "POST");

    client.methods.postMethod(args, function (data, response) {
        // parsed response body as js object
        res.send(token);
        console.log(data);
        // raw response
        console.log(response);
        //response.send(data);
    });
});

router.get('/joinChannel', function(req, res) {
    var url="http://localhost:4000/channels/mychannel/peers"
    var client = new Client();
    var data=fs.readFileSync('token.txt');
    var token=data.toString();
    var args = {
        headers: {
            "authorization":"Bearer "+token,
            "content-type": "application/json"
        },
        data:JSON.stringify({
            "peers": ["peer0.org1.example.com","peer1.org1.example.com"]
        })
    };
    // registering remote methods
    client.registerMethod("postMethod", url, "POST");

    client.methods.postMethod(args, function (data, response) {
        // parsed response body as js object
        res.send('success');
        console.log(data);
        // raw response
        console.log(response);
        //response.send(data);
    });
});

router.get('/installChaincode', function(req, res) {
    var url="http://localhost:4000/chaincodes"
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
            "chaincodeName":"mycc",
            "chaincodePath":"github.com/example_cc/",
            "chaincodeType": "golang",
            "chaincodeVersion":"v0"
        })
    };
    // registering remote methods
    client.registerMethod("postMethod", url, "POST");

    client.methods.postMethod(args, function (data, response) {
        // parsed response body as js object
        res.send('success');
        console.log(data);
        // raw response
        console.log(response);
        //response.send(data);
    });
});

router.get('/instantiateChaincode', function(req, res) {
    var url="http://localhost:4000/channels/mychannel/chaincodes"
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
            "chaincodeName":"mycc",
            "chaincodeVersion":"v0",
            "chaincodeType": "golang",
            "args":[]
        })
    };
    // registering remote methods
    client.registerMethod("postMethod", url, "POST");

    client.methods.postMethod(args, function (data, response) {
        // parsed response body as js object
        res.send('success');
        console.log(data);
        // raw response
        console.log(response);
        //response.send(data);
    });
});


module.exports = router;
