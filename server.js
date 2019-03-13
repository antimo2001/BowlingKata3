import express from 'express';
import bodyParser from 'body-parser';
import pinologger from "express-pino-logger";
import config from './config';
import components from './components';

let app = express();

app.set('port', config.port);
app.set('env', config.env);

// view engine setup
// Dontcare about view engine

app.use(pinologger(config.log));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('', components);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Resource Not Found');
  Object.assign(err, { code: err.status || 404 });
  next(err);
});

// development error handler will print stacktrace
if (config.env === 'development') {
  app.use((err, req, res, next) => {
    Object.assign(err, { code: err.code || err.status || 500 });
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler shows minimal stacktrace
app.use((err, req, res, next) => {
  Object.assign(err, { code: err.code || err.status || 500 });
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});


module.exports = app;