import local from "./local";
import production from "./production";

const { NODE_ENV } = process.env;

let config = {}

switch (NODE_ENV) {
  case 'local':
    config = local;
    break;
  case 'production':
    config = production;
    break;
  default:
    config = {
      'error': `Unknown NODE_ENV:(${NODE_ENV}) ...cannot continue config`
    }
    break;
}

config = Object.freeze(config);

export default config;