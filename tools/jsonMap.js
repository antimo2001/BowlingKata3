import pino from "pino";
import bodyparser from 'body-parser';

const JSON_OPTIONS = {}

const PINO_OPTIONS = {
  name: 'jsonMap',
  enabled: false,
  level: 'fatal',
  // timestamp: false,
  // useLevelLabels: true
}

/**
 * This middleware's internal logger.
 * @type pino.BaseLogger
 */
let _log;

function _makeMap(err, req, res, next) {
  _log.debug(`Begin _makeMap`);

  if (!!err) {
    _log.fatal(err, `Error Before parsing request body`);
    return next(err);
  }
  if (!req.body) {
    return next();
  }

  try {
    /** @type Map<string,value> */
    let jsonMap = new Map();
    const { body } = req;
    const props = Object.getOwnPropertyNames(body);
    _log.debug({ props }, `props`);

    for (const p of props) {
      jsonMap.set(p, body[p]);
    }

    req.jsonMap = jsonMap;
    return next();
  }
  catch (error) {
    _log.error(error, `Error during _makeMap`);
    return next(error);
  }
}

/**
 * Convert entires of this map to a plain-old Json object.
 */
Map.prototype.toObject = function () {
  let mapo = {}
  for (const [p, v] of this.entries()) {
    mapo[p] = v;
  }
  return mapo;
}

/**
 * Middleware to parse the request body to a hashmap. Attaches this hashmap to
 * the request as `req.jsonMap`. Depends on bodyparser and pino.
 * @param {*} options options to setup this middleware's bodyparser.json
 * @param {*} pinoOptions options to send to this middleware's internal logger
 * @returns Map<string,value>() as req.jsonMap
 */
export default function jsonMap(options = JSON_OPTIONS, pinoOptions = PINO_OPTIONS) {
  const jsonparse = bodyparser.json(options);
  _log = pino(pinoOptions);

  // Parse request body as json before using _makeMap
  return function(req, res, next) {
    return jsonparse(req, res, (err) => _makeMap(err, req, res, next));
  }
}
