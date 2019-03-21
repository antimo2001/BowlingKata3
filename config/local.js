const { PORT, NODE_ENV } = process.env;

// Setup the logger config
const log = {
  name: 'bowlingkata3',
  enabled: !process.env.NOLOG,
  level: process.env.LOGLEVEL || 'info',
  timestamp: false,
  useLevelLabels: true,
}

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
  env: NODE_ENV === 'local' ? 'development' : 'production',
  log: log,
  mongo: mongo,
}