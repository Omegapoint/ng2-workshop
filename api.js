var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var loki = require('lokijs');
var jwt = require('jsonwebtoken');
var config = require('./config');
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
var collection = db.addCollection('lectures');
collection.insert({"id": 1, "name": "Elastic search - hur gick det sen?", "description": "Under sommaren 2015 introducerades elasticsearch i AIM-projektet. Under hösten och vintern behövde vi göra flertalet förändringar på grund av saker vi missat vid första implemen-tationen. Jag går igenom de viktigaste lärdomarna. Hur hade vi kunnat undvika de problem vi fick? Hade vi kunnat undvika dem? Gjorde vi något rätt?", "rating": []});
collection.insert({"id": 2, "name": "Hur man bygger en parkeringssensor", "description": "Vad gör man om man saknar parkeringssensorer på sin bil? Jo, man bygger en!", "rating": []});
collection.insert({"id": 3, "name": "Federering med SAML - Felsökningsmetoder och verktyg", "description": "Kort, praktisk genomgång av ett use-case med federering där vi går igenom vilka verktyg och metoder som kan användas för att hitta fel och problem.Vi kommer att använda ett exempel med SAML 2 P Web Browser SSO profile. Vilka plugins till web brow-sers är bäst till vad, och typiska fel.", "rating": []});
collection.insert({"id": 4, "name": "AlphaGo: Nästa generations AI redan idag", "description": "I oktober 2015 slog Google Deepminds AlphaGo trefaldige eu-ropamästaren i Go, Fan Hui, med 5-0 i matcher. Detta följdes upp med att i mars 2016 slå legedariska Lee Sedol med 4-1 i matcher. Vad är det så märkvärdigt med dessa resultat? Behöver vi bry oss? Vad är nästa steg? Den här blixten förklarar varför AlphaGo har fått sådan uppmärksamhet, vilka tekniker som an-vänds, och vad som kan tänkas vänta runt hörnet.", "rating": []});
collection.insert({"id": 5, "name": "Java and Haskell, I now pronounce you husband and wife", "description": "Vi har det stora nöjet att inbjuda Er att bevittna vigseln mellan Frege och Java på Javas virtuella maskin. Under ceremonin kommer vi att diskutera Freges historia och ge några praktiska exempel på hur man skulle kunna tänkas använda Frege i ett projekt. Frege är en icke-strikt och funktionellt programmerings-språk för JVM och syntaxen är närmast identisk med Haskells. Föreläsningen riktar sig till er som är nyfikna på att skriva Haskellkod som kan komplieras till Java.", "rating": []});
collection.insert({"id": 6, "name": "KRAV-märkt", "description": "Allt du undrat om säkerhetskrav men varit för taktfull för att fråga om. Hur känner man igen ett säkerhetskrav? Vi undersöker några kandidater. Varifrån kommer kraven, varför finns de och till vem ställs de? En personlig resa genom en stundom kravlös tillvaro.", "rating": []});
collection.insert({"id": 7, "name": "Låt oss bilda en pakt", "description": "Micro-tjänster och system som kommunicerar via händelser har under de senaste åren blivit väldigt populära. Mycket p.g.a. att system blir flexibla i sitt sätt att leverera och driftsätta de ingåen-de delarna. För att kunna leverera på ett tillförlitligt och oberoen-de sätt utan att bli ett nervvrak så krävs det ett sätt att säkerstäl-la att kommunikationen mellan tjänster fortfarande fungerar. Jag kommer att visa ramverket Pact som erbjuder stöd för verifiering av kommunikationen mellan tjänster.", "rating": []});
collection.insert({"id": 8, "name": "Magic Quadrant for Cloud Infrastructure as a Service", "description": "En överblick av de dominerande företagen som levererar IaaS med särskilt fokus på Amazon Web Services, Microsoft och Google.", "rating": []});
collection.insert({"id": 9, "name": "Spel som hjälpmedel för undervisning", "description": "Gamification, också känt som spelifiering, är ett hett ämne. Den här föreläsningen kommer inte kretsa kring att använda spelme-kanismer för att uppmuntra studenter/elever eller andra till att bli mer motiverade utan istället kommer föreläsningen kretsa kring användningen av spel/tävlingar och lekar för att på ett pedago-giskt och roligt sätt lära ut.", "rating": []});
collection.insert({"id": 10, "name": "Lustfylld frontendprogrammering med Elm", "description": "Elm är ett nytt språk som kortfattat kan beskrivas som ”Haskell för frontend”. Funktionell programmering är ju alltid lustfylld, men Elms rena och vackra programmeringsmodell möjliggör ock-så en rad coola features. Vad sägs t ex om en ”Time Travelling Debugger”? Denna blixt ger dig en liten inblick i hur man jobbar med Elm och vilka möjligheter det ger. Varning utfärdas dock: Det är lätt att bli kär i Elm!", "rating": []});

var users = db.addCollection('users');
users.insert({"user_id": "ari", "password": "multicore"});
users.insert({"user_id": "martin", "password": "multicore"});
users.insert({"user_id": "axel", "password": "multicore"});
users.insert({"user_id": "jens", "password": "multicore"});
users.insert({"user_id": "malin", "password": "multicore"});
users.insert({"user_id": "jennie", "password": "multicore"});
users.insert({"user_id": "katja", "password": "multicore"});
users.insert({"user_id": "john", "password": "multicore"});
users.insert({"user_id": "andreas", "password": "multicore"});
users.insert({"user_id": "jonatan", "password": "multicore"});
users.insert({"user_id": "dana", "password": "multicore"});
users.insert({"user_id": "david", "password": "multicore"});
users.insert({"user_id": "tomas", "password": "multicore"});
users.insert({"user_id": "jakob", "password": "multicore"});
users.insert({"user_id": "fredrik", "password": "multicore"});
users.insert({"user_id": "nick", "password": "multicore"});
users.insert({"user_id": "joakim", "password": "multicore"});
users.insert({"user_id": "pia", "password": "multicore"});
users.insert({"user_id": "michal", "password": "multicore"});
users.insert({"user_id": "olle", "password": "multicore"});
users.insert({"user_id": "omegapoint1", "password": "multicore"});
users.insert({"user_id": "omegapoint2", "password": "multicore"});


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
                expiresInMinutes: 1440 // expires in 24 hours
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

router.get('/lectures', function(req, res) {
    var lectures = collection.find();
    lectures = _.forEach(lectures, function (lecture) {
        lecture.rating = _.map(lecture.rating, function (rating) {
            rating.canDelete = rating.user === req.decoded.user_id;
            return rating;
        });
    });
    res.json(lectures);
});

router.get('/lectures/:lecture_id', function(req, res) {
    var lecture = collection.get(req.params.lecture_id);
    lecture.rating = _.map(lecture.rating, function (rating) {
        rating.canDelete = rating.user === req.decoded.user_id;
        return rating;
    });
    res.json(lecture);
});

router.route('/lectures/:lecture_id/rating')

    .put(function(req, res) {
        var lecture = collection.get(req.params.lecture_id);
        var id = lecture.rating.length + 1;
        lecture.rating.push({
            "id": id,
            "comment": req.body.comment,
            "rating": parseInt(req.body.rating),
            "user": req.decoded.user_id
        });
        collection.update(lecture);
        res.sendStatus(200);
    });

router.delete('/lectures/:lecture_id/rating/:rating_id', function(req, res) {
    var lecture = collection.get(req.params.lecture_id);
    var rating_id = parseInt(req.params.rating_id);
    var ratings = _.reject(lecture.rating, function (rating) {
        return rating.id === rating_id;
    });
    lecture.rating = ratings;
    collection.update(lecture);
    res.sendStatus(200);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Now I'm restful on port " + port);
