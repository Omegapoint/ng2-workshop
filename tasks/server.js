'use strict';

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
const open = require('open');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return next();
});
app.use(express.static('.'));
app.use(function(req, res) {
    // Use res.sendfile, as it streams instead of reading the file into memory.
    res.sendFile(path.join(__dirname, '../', 'index.html'));

});

var chokidarEvEmitter = require('chokidar-socket-emitter');
chokidarEvEmitter({port: 9090, path: '.'});

app.listen(9089);
open('http://localhost:9089', 'google chrome');