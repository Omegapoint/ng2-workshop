var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

var port = process.env.PORT || 80;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

const MOVIES = [
    {"id": 11, "name": "Sagan om ringen"},
    {"id": 12, "name": "James Bond - Spectre"},
    {"id": 13, "name": "X-men"},
    {"id": 14, "name": "Spiderman"},
    {"id": 15, "name": "Terminator 2"},
    {"id": 16, "name": "Borta med vinden"},
    {"id": 17, "name": "Sjunde inseglet"},
    {"id": 18, "name": "Gone in 60 seconds"},
    {"id": 19, "name": "Sällskapsresan"},
    {"id": 20, "name": "Titanic"}
];

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/movies', function(req, res) {
  res.json(MOVIES);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
