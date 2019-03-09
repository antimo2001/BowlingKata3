import config from "../config";
import log from "../tools/log";

export default function listener() {
  const {port, env} = config;
  log.info({port, env}, `API server started`);
}