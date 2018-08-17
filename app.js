const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', {useNewUrlParser: true})
.then( () => {
    console.log('connection established');
})
.catch( (err) => {
    console.log('Connection Error', err);
})

var apiRouter = require('./routes/book');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/playground')));
app.use('/', express.static(path.join(__dirname, 'dist/playground')));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use( function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;
