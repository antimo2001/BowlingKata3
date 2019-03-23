// process.env.NOCHILDLOGGER = 'disablechildloggers';

// Setup the logger config
const log = {
  name: 'bowlingkata3',
  enabled: !process.env.NOLOG,
  level: process.env.LOGLEVEL || 'info',
  timestamp: false,
  useLevelLabels: true,
  child: !process.env.NOCHILDLOGGER
}

//// Log Levels
//// off	100("silent")
//// fatal	60
//// error	50
//// warn	40
//// info	30
//// debug	20
//// trace	10

// Setup the mongodb config
const mongo = {
  mock: !process.env.NOMONGO,
  connect: {
    uri: 'mongodb://localhost:27017',
    database: 'bowlingkata3',
    options: {
      useNewUrlParser: true
    }
  }
}

export default {
  port: 3000,
  env: process.env.NODE_ENV === 'local' ? 'development' : 'production',
  log: log,
  mongo: mongo,
}