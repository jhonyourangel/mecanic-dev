const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// [SH] Require Passport
const passport = require('passport');
const cors = require('cors')
const expressSanitizer = require('express-sanitizer');

// redirect to https
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const errorHandler = require("./app_api/middleware/error-handler");
const sanitizer = require("./app_api/middleware/sanitizer");


// [SH] Bring in the data model
require('./app_api/database/db');
// [SH] Bring in the Passport config after model is defined
require('./app_api/config/passport');


// [SH] Bring in the routes for the API (delete the default routes)
const routesApi = require('./app_api/routes/index');

const app = express();
app.use(cors({origin: '*'}));

// Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSanitizer()); 
app.use(sanitizer());

// [SH] Set the app_client folder to serve static resources
app.use(express.static(path.join(__dirname, 'frontend')));

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());
// [SH] Use the API routes when path starts with /api
app.use('/api', routesApi);

// [SH] Otherwise render the index.html page for the Angular SPA
// [SH] This means we don't have to map all of the SPA routes in Express
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
    // res.sendFile(path.join(__dirname, 'app_client/dist', 'index.html'));
});

app.use(errorHandler());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

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
