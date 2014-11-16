'use strict';

var express = require('express'),
	app = express();
	app.use(express.static(__dirname + '/'));
	// app.listen();
var http = require('http').Server(app),
 	io = require('socket.io')(http);

// app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendFile('index.html', {root: __dirname + '/app/'}, function (err){
		if (err){
			console.log(err);
			res.status(err.status).end();
		}
	});
});

// io.on('connection', function(socket){
//   console.log('a user connected');
// });

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on port 3000');
});
