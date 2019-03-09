import express from 'express';
import bodyParser from 'body-parser';
import logger from "express-pino-logger";
import config from './config';
import mlog from './tools/mlog';
import components from './components';

let app = express();

// view engine setup
// Dontcare about view engine

app.use(logger({
  enabled: config.log.enabled
}));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-status', mlog(l => `routes are pending`), (req, res) => res.status(200).json({ok:'ok'}));

// app.use('', components);

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