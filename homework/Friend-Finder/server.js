// Required
let express = require('express');
let path = require('path');

// Global Variables
let app = express();
let PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// Start Server
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});