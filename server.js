// Requiring dependencies
var express = require('express'),
	body_parser = require('body-parser'),
	app = express();

// Requiring routes 
var views = require("./routes/users.js");

// Variables for server config
var port = 8089,
	api_v = 1,
	req_to = "/api/v" + api_v + "/";

// Setting up body parser
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

// Set the API listening for requests
app.listen(port);

// Taking the requests
app.get(req_to, views.welcome);
app.get(req_to + 'viewer/', views.err);
app.get(req_to + 'viewer/:username', views.get_info);

console.log("Server started on port " + port);