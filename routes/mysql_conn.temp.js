// Requiring dependencies
var mysql = require('mysql');

// Connecting to MySQL
var conn = mysql.createConnection({
	host: 'SERVERHOST',
	user: 'USERNAME',
	password: 'PASSWORD',
	database: 'DBNAME'
});

// Testing connection
conn.connect(function(err) {
	if (!err) {
		console.log("Connected to Database.");
	} else {
		console.log("Failed to connect to Database.");
	}
});

module.exports = conn;