const users = require('../data/friends');

module.exports = function (app) {

	// Get Route
	app.get('/api/friends', function (req, res) {
		res.json(users);
	});

	// Post Route
	app.post('/api/friends', function (req, res) {
		users.push(req.body)
	});
};