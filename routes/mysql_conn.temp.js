// Requiring dependencies
var mysql = require('mysql');

// Connecting to MySQL
var conn = mysql.createConnection({
	host: '45.55.245.98',
	user: 'USERNAME',
	password: 'PASSWORD',
	database: 'minder',
	port: 3306
});

// Testing connection
conn.connect(function(err) {
	if (!err) {
		console.log("Connected to Database.");
	} else {
		console.log("Failed to connect to Database.");
		console.log(err);
	}
});

module.exports = conn;