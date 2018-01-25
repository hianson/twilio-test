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
  console.log('Connection made:', socket.id)

  socket.on('sendText', function(data) {
    console.log(data)
  })

  socket.on('disconnect', function() {
    console.log('Connection ended.')
  })

});
