/************************** 
 * app.js - Setup and initialize the Express server
 *
 ********/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongoskin');

var routes = require('./app/routes/main');
var soundData = require('./app/routes/sound-data');
var toDos = require('./app/routes/to-dos');
var apiFun = require('./app/routes/api-fun');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

// Set the DB based on environment
var db;
if (app.get('env') === 'production') {
    
} else {
    db = mongo.db("mongodb://localhost:27017/personal-website", {native_parser:true});
}
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/to-dos', toDos);
app.use('/sound-data', soundData);
app.use('/api-fun', apiFun);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;