import pino from "pino";

/**
 * Create special logger for the user component
 */
let userLogger = pino({
  name: 'userLogger',
  enabled: true,
  level: process.env.LOGLEVEL || 'info',
  timestamp: false,
  useLevelLabels: true,
});

export default userLogger;