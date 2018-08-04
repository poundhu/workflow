//npm install node-rest-client --save-dev

var Client = require('node-rest-client').Client
function locate() {
    var client = new Client()
    var args = {
        data: {"peers": ["peer0.org1.example.com","peer1.org1.example.com"],
    "fcn":"queryByBillNo",
    "args":["3"]},
        headers: { "Content-Type": "application/json",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMzMzY2OTcsInVzZXJuYW1lIjoiSmltIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1MzMzMDA2OTd9.luTXxV_rorOVA-ncmpzOoQsVbhEaGYup-31sR4ePm3c" }
    };

    // registering remote methods 
    client.registerMethod("postMethod", "http://localhost:4001/channels/mychannel/chaincodes/mycc", "POST");

    client.methods.postMethod(args, function (data, response) {
        // parsed response body as js object 
        console.log(data);
        // raw response 
        console.log(response);
    });
}
locate();