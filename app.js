var express = require('express');
var piCreds = require('./picreds.js');

var app = express()

var localport = '3333';
var localhost = 'http://localhost';

app.get('/', function(req, res) {
	res.json(piCreds);
});

app.host = app.set('host', process.env.HOST || localhost);
app.port = app.set('port', process.env.PORT || localport);

var server = app.listen(app.get('port'), function(){
	app.address = app.get('host') + ':' + server.address().port;
	console.log('Listening at ' + app.address);
});
