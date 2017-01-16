var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

var blankIdentity = {
	id: "",
	username: "",
	color: "#000000"
};

// Each connection has an identity that has a color.
// Keep track of the most recent identity that has reached out and touched us.
var global = {
	currently: blankIdentity,
	identities: {}
};

io.on('connection', function(socket) {

	var self = socket;

	self.added = false;
	self.identity = {};

	socket.on('register', function(identity) {
		// if (self.added) {
		// 	console.log('Already registered: ' + self.identity.username + ' / ' + identity.username);
		// 	return;
		// };

		self.identity = identity;
		global.identities[self.identity.id] = identity;

		socket.emit('registered', global.currently, global.identities);
		// socket.emit('identities', global.identities);
		// socket.emit('touch', global.currently);
		socket.broadcast.emit('identities', global.identities);
		
		console.log("Connected: " + self.identity.username);
		self.added = true;
	});

	socket.on('disconnect', function() {
		console.log("Disconnected: " + self.identity.username);
		delete global.identities[self.identity.id];
		socket.broadcast.emit('identities', global.identities);
	});

	socket.on('touch', function() {
		global.currently = self.identity;
		socket.emit('touch', global.currently);
		socket.broadcast.emit('touch', global.currently);
		console.log('Touch: ' + self.identity.username);
	});

});

