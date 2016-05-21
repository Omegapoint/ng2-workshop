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
collection.insert({"id": 1, "name": "Sagan om ringen", "description": "Tolkiens saga", "rating": []});
collection.insert({"id": 2, "name": "James Bond - Spectre", "description": "Handlar om james bond", "rating": []});
collection.insert({"id": 3, "name": "X-men", "description": "superhjältar", "rating": []});
collection.insert({"id": 4, "name": "Spiderman", "description": "en stor spindel", "rating": []});
collection.insert({"id": 5, "name": "Terminator 2", "description": "klassiker med arnold", "rating": []});
collection.insert({"id": 6, "name": "Borta med vinden", "description": "En gammal film", "rating": []});
collection.insert({"id": 7, "name": "Sjunde inseglet", "description": "Ingmar bergman i högform", "rating": []});
collection.insert({"id": 8, "name": "Gone in 60 seconds", "description": "actionrulle", "rating": []});
collection.insert({"id": 9, "name": "Sällskapsresan", "description": "en rolig film för hela familjen", "rating": []});
collection.insert({"id": 10, "name": "Titanic", "description": "en snyftare", "rating": []});

var users = db.addCollection('users');
users.insert({"user_id": "omegapoint", "password": "mad2016"});

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
  res.json(collection.find());
});

router.get('/movies/:movie_id', function(req, res) {
    res.json(collection.get(req.params.movie_id));
});

router.route('/movies/:movie_id/rating')

.put(function(req, res) {
    var movie = collection.get(req.params.movie_id);
    var id = movie.rating.length + 1;
    movie.rating.push({
      "id": id,
      "comment": req.body.comment,
      "rating": parseInt(req.body.rating)
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
