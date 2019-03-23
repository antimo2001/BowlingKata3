import pino from "pino";

/**
 * Create special logger for the player component
 */
let playerLogger = pino({
  name: 'playerLogger',
  enabled: !process.env.NOCHILDLOGGER,
  level: process.env.LOGLEVEL || 'info',
  timestamp: false,
  useLevelLabels: true,
});

export default playerLogger;