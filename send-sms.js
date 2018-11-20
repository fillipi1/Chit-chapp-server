if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
  }

const accountSid = process.env.FILLIPI;
const authToken = process.env.AUTH_KEY;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


client.messages.create({
    body: '',
    to: '+18315660756',  
    from: '+15103437234',
})
// for(var i =0; i <=10; i++){
//     client.messages.create({
//     body: 'We see you Luke. How is philisophy class going?',
//     messagingServiceSid: 'MG8fe7fc011c35d5c73f5109cf1169db21',
//     to: '+18315660756',  
// })
.then((message) => console.log(message.status))
.done();
