var schedule = require("node-schedule");
var Client = require('node-rest-client').Client;
var fs = require("fs");
var path = require('path');

var rule1     = new schedule.RecurrenceRule();
var times1    = [0,30];
rule1.second  = times1;
schedule.scheduleJob(rule1, function(){
    console.log(Date.now())
    var jsStr=fs.readFileSync('duetime.json')
    var jsObj=JSON.parse(jsStr)
    console.log(jsObj);
    for(k in jsObj){
        console.log(k)
        if(parseInt(jsObj[k])<parseInt(Date.now())){
            var url="http://localhost:4000/channels/mychannel/chaincodes/mycc"
            var client = new Client();
            //get token
            var data=fs.readFileSync(path.resolve(__dirname, '../workflow/token.txt'));
            var token=data.toString();
            //post data
            var args = {
                headers: {
                    "authorization":"Bearer "+token,
                    "content-type": "application/json"
                },
                data:JSON.stringify({
                    "peers": ["peer0.org1.example.com","peer1.org1.example.com"],
                    "fcn":"checkDue",
                    "args":[k]
                })
            };
            // registering remote methods
            client.registerMethod("postMethod", url, "POST");

            client.methods.postMethod(args, function (data, response) {
                // parsed response body as js object
                console.log(JSON.stringify(data.toString()));
                //console.log(data);

            });
            delete jsObj[k];
            console.log(jsObj);
            fs.writeFile('duetime.json', JSON.stringify(jsObj),  function(err) {
                if (err) {
                    return console.error(err);
                }
                console.log("数据写入成功！");
            });

        }
    }
});