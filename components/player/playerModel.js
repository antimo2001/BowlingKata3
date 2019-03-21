import mongoose from "mongoose";
import log from "./playerLogger";
import config from "../../config";

log.trace(`file found: playerModel`);
const MODEL_NAME = 'Player';

/**
 * Defines the Player data model.
 * @type mongoose.model
 */
let Player;

/**
 * Connect to database using mongoose instance
 */
const dbconnect = () => {
  const { uri, database, options } = config.mongo.connect;
  mongoose.connect(`${uri}/${database}`, options);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    log.info(`Done connecting to database (${database})`);
  });
}

const connectAndDefine = () => {
  if (!!Player) {
    return log.info(`${MODEL_NAME} model is already defined`);
  }
  dbconnect();

  log.info(`Define the schema for ${MODEL_NAME}`);
  const sa = mongoose.Schema({
    playername: String,
    secret: String,
    email: String
  });

  log.info(`Define the model for ${MODEL_NAME}`);
  Player = mongoose.model(MODEL_NAME, sa);
}

{
  connectAndDefine();
}

export default Player;