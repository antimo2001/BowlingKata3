import mongoose from "mongoose";
import log from "./userLogger";
import dbconnect from "../../tools/dbconnect";

log.trace(`file found: userModel`);
const MODEL_NAME = 'User';

dbconnect();

/** @type mongoose.Schema */
let _UserSchema;
/** @type mongoose.model */
let _User;

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
    if (!_UserSchema) {
      log.info(`Define the schema for ${MODEL_NAME}`);
      _UserSchema = new mongoose.Schema({
        username: String,
        secret: String,
        email: String,
        dateCreated: { type: Date, default: Date.now },
        dateUpdated: { type: Date, default: Date.now }
      });
    }

    return _UserSchema;
  }

  /**
   * This property defines the User data model.
   * @type mongoose.model
   * @readonly
   */
  static get User() {
    if (!_User) {
      log.info(`Define the model for ${MODEL_NAME}`);
      let s = UserModel.UserSchema;
      _User = mongoose.model(MODEL_NAME, s);
    }

    return _User;
  }

}