'use strict';

var express = require('express'),
	app = express();
var http = require('http').Server(app),
 	io = require('socket.io')(http);

// app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/dist/js/bundle.js'));
app.get('/', function(req, res){
  res.sendfile('app/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});