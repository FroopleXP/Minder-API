// Including MySQL connect script
try {
	var db = require('./mysql_conn.js');
} catch (err) {
	console.log("Couldn't find MySQL config file!");
}

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

	// Objects for response
	var resp = {},
		classes = {},
		task_name = {},
		task_desc = {};

	// Checking the user exists!
	db.query('select users.id from users where username = ?', username, function(err, result) {
		// If there's an error
		if (err) throw err;
		
		if (result.length < 1) {
			// User doesn't exist
			res.json({
				status: 0,
				warning: 'That user doesn\'t exist!'
			});
			
		} else if (result.length > 0) {
			// Getting info about the user
			db.query('select tasks.id "task_id", tasks.task_name "task_name", tasks.task_desc "task_desc", classes.class_name "class_name", classes.id "class_id" from tasks, classes where tasks.class_id = classes.id and tasks.class_id in (select classes.id from classes where classes.id in (select relations.class_id from relations where relations.student_id in (select users.id from users where users.username like ?)))', username, function(err, result) {

				if (result.length > 0) {

					// Looping through data
					for (i = 0; i < result.length; i++) {
						resp[i] = {
							'class_name': result[i].class_name,
							'task_name': result[i].task_name,
							'task_desc': result[i].task_desc
						}
					}

					res.json({
						status: 1,
						tasks: resp
					});

				} else {
								res.json({
										status: 0,
										warning: 'No tasks to get!'
								}); 
						}

			});	
		}
	});

}

