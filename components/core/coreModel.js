import mongoose from "mongoose";
import log from "./coreLogger";

log.trace(`file found: coreModel`);
const MODEL_NAME = 'Core';

/** @type mongoose.Schema */
let _CoreSchema;
/** @type mongoose.model */
let _Core;

/**
 * Class contains static properties for the Core schema and model.
 */
export class CoreModel {
  /**
   * This property defines the Core schema.
   * @type mongoose.Schema
   * @readonly
   */
  static get CoreSchema() {
    if (!_CoreSchema) {
      log.info(`Define the schema for ${MODEL_NAME}`);
      _CoreSchema = new mongoose.Schema({
        corename: String,
        secret: String,
        email: String,
        dateCreated: { type: Date, default: Date.now },
        dateUpdated: { type: Date, default: Date.now }
      });
    }

    return _CoreSchema;
  }

  /**
   * This property defines the Core data model.
   * @type mongoose.model
   * @readonly
   */
  static get Core() {
    if (!_Core) {
      log.info(`Define the model for ${MODEL_NAME}`);
      let s = CoreModel.CoreSchema;
      _Core = mongoose.model(MODEL_NAME, s);
    }

    return _Core;
  }

}