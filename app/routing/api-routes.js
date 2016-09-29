var friends = require('../data/friends.js');
var path = require('path');

module.exports = function(app){
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});
	app.post('/api/friends', function(req, res){
		var match;
		var least = 10000;
		for(var i=0; i<friends.length; i++){
			var newDif = 0;
			for(var j=0; j<friends[i].scores.length; j++){
				newDif += Math.abs(friends[i].scores[j] - req.body.scores[j])
			};
			if(newDif < least){
				least = newDif;
				match = i;
			};
		};
		friends.push(req.body);
		res.json(friends[match]);
	});
}