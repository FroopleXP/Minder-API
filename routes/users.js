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
	var classes = {};
	var task_name = {};
	var task_desc = {};


	// Getting info about the user
	db.query('select tasks.id "task_id", tasks.task_name "task_name", tasks.task_desc "task_desc", classes.class_name "class_name", classes.id "class_id" from tasks, classes where tasks.class_id = classes.id and tasks.class_id in (select classes.id from classes where classes.id in (select relations.class_id from relations where relations.student_id in (select users.id from users where users.username like ?)))', username, function(err, result) {

		if (result.length > 0) {

			for (i = 0; i < result.length; i++) {
				classes[result[i].class_id] = result[i].class_name;
			}

			res.json({
				data: {
					classes: classes
				}
			});

		}

	});

}

