import mongoose from "mongoose";
import log from "./userLogger";
import dbconnect from "../../tools/dbconnect";

log.trace(`file found: userModel`);
const MODEL_NAME = 'User';

dbconnect();

const g = {
  /** @type mongoose.Schema */
  UserSchema: null,
  /** @type mongoose.model */
  User: null
}

/**
 * Class contains static properties for the User schema and model.
 */
export default class UserModel {
  /**
   * This property defines the User schema.
   * @type mongoose.Schema
   * @readonly
   */
  static get UserSchema() {
    if (!g.UserSchema) {
      log.info(`Define the schema for ${MODEL_NAME}`);
      g.UserSchema = new mongoose.Schema({
        username: String,
        secret: String,
        email: String,
        dateCreated: { type: Date, default: Date.now },
        dateUpdated: { type: Date, default: Date.now }
      });
    }

    return g.UserSchema;
  }

  /**
   * This property defines the User data model.
   * @type mongoose.model
   * @readonly
   */
  static get User() {
    if (!g.User) {
      log.info(`Define the model for ${MODEL_NAME}`);
      let s = UserModel.UserSchema;
      g.User = mongoose.model(MODEL_NAME, s);
    }

    return g.User;
  }

}