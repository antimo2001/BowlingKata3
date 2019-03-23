import pino from "pino";
import config from "../../config";

let l = pino(Object.assign(config.log, {
  name: 'PlayerLogger',
  enabled: config.log.child
}));

export default l;