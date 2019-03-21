import config from "../config";
import pino from "pino";

let log = pino(config.log);

export default log;