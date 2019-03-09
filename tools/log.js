import config from "../config";
import pino from "pino";

let log = pino({
  enable: config.log.enabled
});

export default log;