import mongoose from "mongoose";
import config from "../config";
import log from "./log";

/** @type {uri,database,options} */
const DBCONFIG = config.mongo.connect;
/** @type mongoose.connection */
let DB;

/**
 * Setup mongoose's database connection. Mongoose only needs to connect once.
 * @param {Object} dbconfig config for connecting; defaults to DBCONFIG
 */
export default function dbconnect(dbconfig = DBCONFIG) {
  if (!!DB) {
    log.trace(`already setup mongoose database connection`);
  }
  else {
    log.trace(`connect to database via mongoose`);
    const { uri, database, options } = dbconfig;
    mongoose.connect(`${uri}/${database}`, options);

    DB = mongoose.connection;

    DB.on('error', console.error.bind(console, 'Connection Error:'));

    DB.once('open', function () {
      log.info(`Done connecting to database (${database})`);
    });
  }

  return DB;
}
