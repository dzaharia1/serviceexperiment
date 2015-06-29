var express = require('express');
var piCreds = require('./picreds.js').personality_insights[0];
var watson = require('watson-developer-cloud');

var app = express();

var localport = '3333';
var localhost = 'http://localhost';

var dummyText = 'the quick brown fox jumps over the lazy dog.';

var credentials = {
	version: 'v2',
	url: piCreds.credentials.url,
	username: piCreds.credentials.username,
	password: piCreds.credentials.password
};

var personalityInsights = new watson.personality_insights(credentials);


app.get('/', function(req, res) {
	res.send(credentials);
});

app.get('/testCall', function(req, res) {
	personalityInsights.profile({ text: 'Call me Ishmael. Some years ago-never mind how long precisely-"\
"having little or no money in my purse, and nothing particular to interest me "\
"on shore, I thought I would sail about a little and see the watery part of "\
"the world. It is a way I have of driving off the spleen and regulating the "\
"circulation. Whenever I find myself growing grim about the mouth; whenever it "\
"is a damp, drizzly November in my soul; whenever I find myself involuntarily "\
"pausing before coffin warehouses, and bringing up the rear of every funeral I "\
"meet; and especially whenever my hypos get such an upper hand of me, that it "\
"requires a strong moral principle to prevent me from deliberately stepping "\
"into the street, and methodically knocking people\'s hats off-then, I account "\
"it high time to get to sea as soon as I can.' }, function(err, profile) {
		if (err) {
			console.log(res.status(err.code));
			// console.log(err.message);
		}
		else {
			res.json(profile);
		}
	});
});

app.host = app.set('host', process.env.HOST || localhost);
app.port = app.set('port', process.env.PORT || localport);

var server = app.listen(app.get('port'), function(){
	app.address = app.get('host') + ':' + server.address().port;
	console.log('Listening at ' + app.address);
});
