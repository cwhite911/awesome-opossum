'use strict';

var express = require('express'),
		passport = require('passport'),
  	LocalStrategy = require('passport-local').Strategy,
		app = express(),
		http = require('http').Server(app),
		io = require('socket.io')(http),
		mongoose = require('mongoose'),
		User = require('./server/models/User');


	//Connect to database
	mongoose.connect('mongodb://localhost/awesome');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		console.log('Connected to mongodb...')
	});
	//Middleware
	app.use(express.static(__dirname + '/'));

	passport.use(new LocalStrategy(
		function(username, password, done) {
			console.log(username + ' ' + password);
			User.findOne({ email: username }, function(err, user) {
				console.log(user);
				if (err) { return done(err); }
					if (!user) {
						return done(null, false, { message: 'Incorrect username.' });
					}
					if (!user.validPassword(password)) {
						return done(null, false, { message: 'Incorrect password.' });
					}
					return done(null, user);
				});
			}
		));

//Routes
app.post('/login',
	passport.authenticate('local', { successRedirect: '/user/:id',
		failureRedirect: '/#/register',
		failureFlash: false })
	);

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
