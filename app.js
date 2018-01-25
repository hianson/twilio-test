// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const testRecipient = process.env.TEST_RECEIVER
const testSender = process.env.TEST_SENDER

const client = require('twilio')(accountSid, authToken);
var axios = require('axios')

// Server
var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/public', express.static(__dirname + '/public'));

serv.listen(3000, function() {
  console.log('Listening for clients...')
});

var io = require('socket.io')(serv, {});

io.sockets.on('connection', function(socket) {
  console.log('Connection from socket id:', socket.id)

  socket.on('sendText', function(data) {
    var url = `https://dog.ceo/api/breed/${data.breed}/images/random`

    getDogImage(url)
  })
  socket.on('disconnect', function() {
    console.log('Connection ended.')
  })

});

function getDogImage(url) {
  axios.get(url)
    .then(function (response) {
      console.log(response.data.message)
      sendText(response.data.message)
    })
    .catch(function (error) {
      console.log(error);
  });
}

function sendText(data) {
  client.messages
    .create({
      to: '+' + testRecipient,
      from: '+' + testSender,
      mediaUrl: data,
    })
    .then(message => console.log(message.sid));
}
