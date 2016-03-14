var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var loki = require('lokijs');

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
var db = new loki('data.json');
var collection = db.addCollection('movies');
collection.insert({"id": 1, "name": "Sagan om ringen", "description": "Tolkiens saga"});
collection.insert({"id": 2, "name": "James Bond - Spectre", "description": "Handlar om james bond"});
collection.insert({"id": 3, "name": "X-men", "description": "superhjältar"});
collection.insert({"id": 4, "name": "Spiderman", "description": "en stor spindel"});
collection.insert({"id": 5, "name": "Terminator 2", "description": "klassiker med arnold"});
collection.insert({"id": 6, "name": "Borta med vinden", "description": "En gammal film"});
collection.insert({"id": 7, "name": "Sjunde inseglet", "description": "Ingmar bergman i högform"});
collection.insert({"id": 8, "name": "Gone in 60 seconds", "description": "actionrulle"});
collection.insert({"id": 9, "name": "Sällskapsresan", "description": "en rolig film för hela familjen"});
collection.insert({"id": 10, "name": "Titanic", "description": "en snyftare"});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/movies', function(req, res) {
  res.json(collection.find());
});

router.route('/movies/:movie_id/rating')

.put(function(req, res) {
    var movie = collection.get(req.params.movie_id);
    movie.rating = {
      "comment": req.body.comment,
      "rating": req.body.rating
    };
    collection.update(movie);
    res.sendStatus(200);
})

.delete(function(req, rest) {
  var movie = collection.get(req.params.movie_id);
  delete movie.rating;
  collection.update(movie);
  res.sendStatus(200);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
