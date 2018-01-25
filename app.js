// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const testRecipient = process.env.TEST_RECEIVER
const testSender = process.env.TEST_SENDER
// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);


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
    if (data.recipient.length === 11) {
    client.messages
      .create({
        to: '+' + testRecipient,
        from: '+' + testSender,
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      })
      .then(message => console.log(message.sid));
    }





  })

  socket.on('disconnect', function() {
    console.log('Connection ended.')
  })

});
