var schedule = require("node-schedule");
var Client = require('node-rest-client').Client;

var rule1     = new schedule.RecurrenceRule();
var times1    = [0,30];
rule1.minute  = times1;
schedule.scheduleJob(rule1, function(){
    console.log(Date.now())
    var jsStr=fs.readFileSync('duetime.json')
    var jsObj=JSON.parse(jsStr)
    for(k in jsObj){
        if(int(jsObj[k])<int(Date.now())){
            var url="http://localhost:4000/channels/mychannel/chaincodes/mycc"
            var client = new Client();
            //get token
            var data=fs.readFileSync('token.txt');
            var token=data.toString();
            //post data
            var args = {
                headers: {
                    "authorization":"Bearer "+token,
                    "content-type": "application/json"
                },
                data:JSON.stringify({
                    "peers": ["peer0.org1.example.com","peer1.org1.example.com"],
                    "fcn":"checkdue",
                    "args":[k]
                })
            };
            console.log(JSON.stringify([req.query]));
            // registering remote methods
            client.registerMethod("postMethod", url, "POST");

            client.methods.postMethod(args, function (data, response) {
                // parsed response body as js object
                console.log(JSON.stringify(data.toString()));
                console.log(data);

            });
            jsObj.remove(k)
        }
    }
});