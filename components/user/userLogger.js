import pino from "pino";
import config from "../../config";

let l = pino(Object.assign(config.log, {
  name: 'UserLogger',
  enabled: config.log.child
}));

export default l;