var friends = require('../data/friends.js');
var path = require('path');

module.exports = function(app) {
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});
	app.post('/api/friends', function(req, res) {
		var match;
		var worst = 10000;
		for(var i = 0; i < friends.length; i++) {
			var baseLine = 0;
			for(var j = 0; j < friends[i].scores.length; j++) {
				baseLine += Math.abs(friends[i].scores[j] - req.body.scores[j]);
			};
			if(baseLine < worst){
				worst = baseLine;
				match = i;
			};
		};
		friends.push(req.body);
		res.json(friends[match]);
	});
}