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
    {"id": 11, "name": "Sagan om ringen", "description": "Tolkiens saga"},
    {"id": 12, "name": "James Bond - Spectre", "description": "Handlar om james bond"},
    {"id": 13, "name": "X-men", "description": "superhjältar"},
    {"id": 14, "name": "Spiderman", "description": "en stor spindel"},
    {"id": 15, "name": "Terminator 2", "description": "klassiker med arnold"},
    {"id": 16, "name": "Borta med vinden", "description": "En gammal film"},
    {"id": 17, "name": "Sjunde inseglet", "description": "Ingmar bergman i högform"},
    {"id": 18, "name": "Gone in 60 seconds", "description": "actionrulle"},
    {"id": 19, "name": "Sällskapsresan", "description": "en rolig film för hela familjen"},
    {"id": 20, "name": "Titanic", "description": "en snyftare"}
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
