$(function() {
	var socket = io();
	var connected = false;

	$('#register-button').click(function () {
		var username = $('#name').val();
		var color = $('#color').val();

		if (!username || !color) {
			console.log("Invalid reg", username, color);
			return;
		}

		var myIdentity = {
			id: guid(),
			username: username,
			color: color
		};
		console.log(myIdentity);
		socket.emit('register', myIdentity);
	});

	function guid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	}

	$(document).click(function () {
		if (connected) {
			socket.emit('touch');
			console.log('I touched');
		}
		else { console.log('not even connected'); }
	});

	socket.on('registered', function (touchData, identitiesData) {
		registeredHandler();
		touchHandler(touchData);
		identitiesHandler(identitiesData);
	});

	socket.on('touch', function (data) {
		touchHandler(data);
	});

	socket.on('identities', function (data) {
		identitiesHandler(data);
	});

	function registeredHandler() {
		connected = true;
		$('.register-box').hide();
		$('.identities-box').show();
	}

	function touchHandler(data) {
		console.log('touch received', data);
		$('body').css({ 'background-color': data.color });
	}

	function identitiesHandler(data) {
		var list = $('#identities');
		list.empty();

		$.each(data, function () {
			list.append($('<li>' + this.username +'</li>').css({ color: this.color }));
		});
	}

});