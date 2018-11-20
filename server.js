if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
  }
var express = require('express');
var app = express();
var twilio = require('twilio');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var firebase = require('firebase');

firebase.initializeApp({
    databaseURL: "https://chat-dashboard-5dbff.firebaseio.com",
    //serviceAccount: 'myapp-13ad200fc320.json', //this is file that I downloaded from Firebase Console
});

// const accountSid = process.env.FILLIPI;
// const authToken = process.env.AUTH_KEY;
// var client = new twilio(accountSid, authToken);

 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json());
 app.use(cors());

app.get('/', function (req, res) {
   res.send('wassup Woooooorld');
});

app.post('/status', function (req, res) {
    res.send('Status URL');

 });

app.get('/records', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers");
    var response = {person : 'meek'};
    res.json(response)
});

 app.post('/sendsms', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers");
    console.log(req.body);
    client.messages.create({
        body: req.body.text,
        to: req.body.phone,  
        from: '+15103437234',
    })
    .then((message) => console.log(message.status))
    .done();
    
 });

app.post('/sms', function (req, res) {
    console.log('received')
    let incomingNum = req.body.From;

    var newMessageData = {
    phone: incomingNum,

    timestamp: Date.now(),
    message: req.body.Body
    };
    var ref = firebase.database().ref('messages(trial)');
    ref.child(incomingNum).once("value", snapshot => {
        //if the number isnt in the database then add it
        if(!(snapshot.exists())){
            //set the incmoming number key first
            ref.child(incomingNum).set(0);
        }
        //add the message
        var newMessageKey = ref.child(incomingNum).push().key;
        var updates = {};

         updates['messages(trial)/' + incomingNum + '/' + newMessageKey] = newMessageData;
         firebase.database().ref().update(updates);
    });
    // let textRef = firebase.database().ref('customers').on("value", function(snapshot) {
    //     userArr = Object.keys(snapshot.val()).map(x => snapshot.val()[x]);
    //     console.log(userArr)
    //     const chatId = (userArr[0].chatId)
    //         const inText = firebase.database().ref(`messages(trial)/${chatId}`);
    //         const item = {
    //           phone:req.body.From,
    //           Text: req.body.Body,            
    //         }
    //         inText.push(item);
    //         res.end();
    // });
    //console.log(req.body);  
});
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Server listening at http://%s:%s", host, port)
});