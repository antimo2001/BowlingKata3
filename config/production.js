// Setup the logger config
const log = {
  name: 'bowlingkata3',
  enabled: !process.env.NOLOG,
  level: process.env.LOGLEVEL || 'warn',
  timestamp: true,
  useLevelLabels: false,
  child: !process.env.NOCHILDLOGGER
}

// Setup the mongodb config
const mongo = {
  mock: !process.env.NOMONGO,
  connect: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
    database: 'bowlingkata3',
    options: {
      useNewUrlParser: true
    }
  }
}

export default {
  port: 3000,
  env: 'production',
  log: log,
  mongo: mongo,
}