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
 * @returns mongoose.connection
 */
export default function dbconnect(dbconfig = DBCONFIG) {
  if (!DB) {
    log.info(`Setup mongoose's database connection`);
    const { uri, database, options } = dbconfig;
    mongoose.connect(`${uri}/${database}`, options);
    DB = mongoose.connection;
  }
  else {
    log.trace(`Already setup mongoose database connection`);
  }

  return DB;
}
