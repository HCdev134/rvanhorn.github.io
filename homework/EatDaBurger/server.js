let express = require('express');
let bodyParser = require('body-parser');
let exphbs = require('express-handlebars');
let routes = require('./controllers/burgers_controllers.js');

let PORT = process.env.PORT || 8000;
let app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(routes);

app.listen(PORT, function() {

	console.log(`Listening on port ${PORT}`);

});
