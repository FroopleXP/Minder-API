// Including MySQL connect script
var db = require('./mysql_conn.js');

// Welcome export
exports.welcome = function(req, res) {
	res.json({
		status: 'ok',
		message: 'Welcome to the Minder API'
	});
}

// When no Username is supplied
exports.err = function(req, res) {
	res.json({
		status: 'ok',
		warning: 'You must specify a Username'
	});
}

// When Username is supplied
exports.get_info = function(req, res) {

	// Getting the Username from the request
	var username = req.params.username;

	// Getting info about the user
	db.query('SELECT `stu_id`, `email`, `full_name` FROM users WHERE username = ? LIMIT 1', username, function(err, result) {
		// Checking response
		if (result.length < 1) {
			res.json({
				status: 'ok',
				warning: 'Failed to load user details...'
			});
		} else {
			res.json({
				status: 'ok',
				data: result
			});
		}
	});

}