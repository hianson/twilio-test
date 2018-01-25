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
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN

io.sockets.on('connection', function(socket) {
  console.log('Connection made:', socket.id)

  socket.on('sendText', function(data) {
    console.log(TWILIO_ACCOUNT_SID)
    console.log(TWILIO_AUTH_TOKEN)


    // // Twilio Credentials
    // const accountSid = TWILIO_ACCOUNT_SID;
    // const authToken = TWILIO_AUTH_TOKEN;
    //
    // // require the Twilio module and create a REST client
    // const client = require('twilio')(accountSid, authToken);
    //
    // client.messages
    //   .create({
    //     to: '+15558675310',
    //     from: '+15017122661',
    //     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    //   })
    //   .then(message => console.log(message.sid));





  })

  socket.on('disconnect', function() {
    console.log('Connection ended.')
  })

});
