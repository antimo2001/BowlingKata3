import mongoose from "mongoose";
import log from "../../tools/log";
import config from "../../config";
// const {ObjectId} = mongoose.Schema.Types;
const dbConfig = config.mongo.connect;

log.trace(`file found: userModel`);
const MODEL_NAME = 'User';

/**
 * Defines the User data model.
 * Try to fetch the mongoose.model; define the model if it doesnt exist
 * @type mongoose.model
 */
let User;

/**
 * Define the schema and model
 * @returns mongoose.model<User>
 */
const defineModel = () => {
  log.info(`Define the schema for ${MODEL_NAME}`);
  const sa = mongoose.Schema({
    username: String,
    secret: String,
    email: String
  });
  log.info(`Define the model for ${MODEL_NAME}`);
  return mongoose.model(MODEL_NAME, sa);
}

const connectFetchAndDefine = () => {
  if (!User) {
    const {uri, database, options} = dbConfig;
    mongoose.connect(`${uri}/${database}`, options);
    mongoose.connection.once('open', function() {
      log.info(`Done connecting to database`);
    });

    User = defineModel(MODEL_NAME);
  }
  else {
    log.info(`${MODEL_NAME} model is already defined`);
  }
}

{
  connectFetchAndDefine();
}

export default User;