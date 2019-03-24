import local from "./local";
import production from "./production";

const { NODE_ENV } = process.env;

let config = {}

switch (NODE_ENV) {
  case 'local':
    config = local;
    break;
  case 'test':
    config = local;
    break;
  case 'production':
    config = production;
    break;
  default:
    console.error(`Unknown NODE_ENV:(${NODE_ENV}) ...use local.js`);
    config = local;
    break;
}

config = Object.freeze(config);

export default config;