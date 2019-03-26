import express from 'express';
// import bodyParser from 'body-parser';
import pino from "pino";
import pinologger from "express-pino-logger";

/**
 * Small express app for practicing middlewares in isolation
 */
import coreRouter from "./coreRoute";
import jsonMap from "../../tools/jsonMap";
import dbconnect from '../../tools/dbconnect';

///////////////////////////////////////////////////////////////////////////////
// #region Config
const config = {
  port: 3010,
  env: 'development',
  log: {
    name: 'practice0_express',
    enabled: true,
    level: process.env.LOGLEVEL || 'debug',
    timestamp: false,
    useLevelLabels: true
  },
  jsonMap: [
    {},
    {
      name: 'practiceJsonMap',
      enabled: true,
      level: 'error',
      timestamp: false,
      useLevelLabels: true
    }
  ]
}

const dbconfig = {
  connect: {
    uri: 'mongodb://localhost:27017',
    database: 'practice0_express',
    options: {
      useNewUrlParser: true
    }
  }
}

// #endregion Config

const l = pino(config.log);

let app = express();

///////////////////////////////////////////////////////////////////////////////
// #region Express setup

app.set('port', config.port);
app.set('env', config.env);

app.use(pinologger(config.log));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// #endregion Express setup

// app.use('/api', components);

////////////////////////////////////////////////////////////////////////////////
// #region coreRouter
app.use('/api/cores', coreRouter);
// #endregion coreRouter

////////////////////////////////////////////////////////////////////////////////
// #region /debugjsonmap
// app.use('/', jsonMap(...config.jsonMap));
app.use('/', jsonMap());
app.post('/debugjsonmap', (req, res, next) => {
  /** @type Map<string,value> */
  const map = req.jsonMap
  let mapo = {}
  for (const [p, v] of map) {
    l.info({ p, v })
    mapo[p] = v;
  }
  // return res.status(200).json(mapo)
  return res.status(200).json({
    keys: [...map.keys()],
    values: [...map.values()],
  })
});
app.get('/', (req, res, next) => {
  return res.status(200).json({
    debug: {
      middleware: 'jsonMap',
      verb: 'POST /debugjsonmap and send json in the body!'
    },
    examplebody: {
      "name":"Alice Apple",
      "username":"aliceapple@person.org",
      "secret":"password1",
      "roles":["normal","org-admin"],
      "digitalId":"abcdef012345",
    }
  });
});
// #endregion /debugjsonmap

///////////////////////////////////////////////////////////////////////////////
// #region Express error handlers

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Resource Not Found');
  Object.assign(err, { code: err.status || 404 });
  next(err);
});

app.use((err, req, res, next) => {
  Object.assign(err, { code: err.code || err.status || 500 });
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});
// #endregion Express error handlers


module.exports = app;

///////////////////////////////////////////////////////////////////////////////
// #region Connect to mongoose; then start server
function listen() {
  app.listen(config.port, () => {
    const {port,env} = config
    console.log(`API server started: ${port}, ${env}`)
  });
}

function connect() {
  // Connect mongoose; then start API server
  dbconnect(dbconfig.connect)
    .on('error', console.error)
    .on('disconnected', connect)
    .once('open', listen);
}

connect();
// #endregion Connect to mongoose; then start server
