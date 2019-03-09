const { PORT, NODE_ENV } = process.env;

// Setup the logger config
const log = {
  enabled: !process.env.NOLOG
}

// Setup the mongodb config
const mongoCertificateConfig = {};

const mongo = {
  mock: !process.env.NOMONGO,
  connect: {
    uri: 'TODO mongo uri',
    database: 'TODO mongo database',
    certificate: mongoCertificateConfig,
  }
}

export default {
  port: PORT || 3000,
  env: NODE_ENV === 'local' ? 'development' : 'production',
  log: log,
  mongo: mongo,
}