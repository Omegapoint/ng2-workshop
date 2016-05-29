var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var loki = require('lokijs');
var jwt = require('jsonwebtoken');
var config = require('./config2');
var _ = require('lodash');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization");
  return next();
});
app.set('superSecret', config.secret);

var port = process.env.PORT || 5000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var db = new loki('data.json');
var collection = db.addCollection('movies');
collection.insert({"id": 1, "name": "The Shawshank Redemption", "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", "rating": []});
collection.insert({"id": 2, "name": "The Godfather", "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", "rating": []});
collection.insert({"id": 3, "name": "The Godfather II", "description": "The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.", "rating": []});
collection.insert({"id": 4, "name": "The Dark Knight", "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.", "rating": []});
collection.insert({"id": 5, "name": "Schindler's list", "description": "In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.", "rating": []});
collection.insert({"id": 6, "name": "12 angry men", "description": "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.", "rating": []});
collection.insert({"id": 7, "name": "Pulp fiction", "description": "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", "rating": []});
collection.insert({"id": 8, "name": "The lord of the rings: The return of the king", "description": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.", "rating": []});
collection.insert({"id": 9, "name": "Il buono, il brutto, il cattivo", "description": "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.", "rating": []});
collection.insert({"id": 10, "name": "Fight club", "description": "An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soap maker, forming an underground fight club that evolves into something much, much more...", "rating": []});


var users = db.addCollection('users');
users.insert({"user_id": "omegapoint1", "password": "mad2016"});
users.insert({"user_id": "omegapoint2", "password": "mad2016"});
users.insert({"user_id": "omegapoint3", "password": "mad2016"});
users.insert({"user_id": "omegapoint4", "password": "mad2016"});
users.insert({"user_id": "omegapoint5", "password": "mad2016"});
users.insert({"user_id": "omegapoint6", "password": "mad2016"});
users.insert({"user_id": "omegapoint7", "password": "mad2016"});
users.insert({"user_id": "omegapoint8", "password": "mad2016"});
users.insert({"user_id": "omegapoint9", "password": "mad2016"});
users.insert({"user_id": "omegapoint10", "password": "mad2016"});
users.insert({"user_id": "omegapoint11", "password": "mad2016"});
users.insert({"user_id": "omegapoint12", "password": "mad2016"});
users.insert({"user_id": "omegapoint13", "password": "mad2016"});
users.insert({"user_id": "omegapoint14", "password": "mad2016"});
users.insert({"user_id": "omegapoint15", "password": "mad2016"});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.post('/authenticate', function(req, res) {
  var result = users.find({"user_id": req.body.user_id});
  if (result.length == 0) {
    //res.json({ success: false, message: 'Authentication failed. User not found.' });
    res.sendStatus(401);
  } else {
    var user = result[0];
    if (user.password != req.body.password) {
       //res.json({ success: false, message: 'Authentication failed. Wrong password.' });
       res.sendStatus(401);
     } else {
       // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {

        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
     }
  }
});

router.use(function(req, res, next) {

  if (req.method == 'OPTIONS') {
    next();
  } else {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['authorization'];
    var usingHeader = false;
    if (req.headers['authorization']) {
      usingHeader = true;
    }

    // decode token
    if (token) {
      if (usingHeader) {
        var headerArr = token.split(' ');
        token = headerArr.length > 0 ? headerArr[1].trim() : token;
      }
      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.status(403).send({
              success: false,
              message: '´Failed to authenticate token.'
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });

    }
  }

});

router.get('/movies', function(req, res) {
  var movies = collection.find();
  movies = _.forEach(movies, function (movie) {
      movie.rating = _.map(movie.rating, function (rating) {
        rating.canDelete = rating.user === req.decoded.user_id;
        return rating;
      });
  });
  res.json(movies);
});

router.get('/movies/:movie_id', function(req, res) {
    var movie = collection.get(req.params.movie_id);
    movie.rating = _.map(movie.rating, function (rating) {
      rating.canDelete = rating.user === req.decoded.user_id;
      return rating;
    });
    res.json(movie);
});

router.route('/movies/:movie_id/rating')

.put(function(req, res) {
    var movie = collection.get(req.params.movie_id);
    var id = movie.rating.length + 1;
    movie.rating.push({
      "id": id,
      "comment": req.body.comment,
      "rating": parseInt(req.body.rating),
      "user": req.decoded.user_id
    });
    collection.update(movie);
    res.sendStatus(200);
});

router.delete('/movies/:movie_id/rating/:rating_id', function(req, res) {
  var movie = collection.get(req.params.movie_id);
  var rating_id = parseInt(req.params.rating_id);
  var ratings = _.reject(movie.rating, function (rating) {
    return rating.id === rating_id;
  });
  movie.rating = ratings;
  collection.update(movie);
  res.sendStatus(200);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Now I'm restful on port " + port);
