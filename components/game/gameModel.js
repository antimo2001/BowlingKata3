import mongoose from "mongoose";
import log from "./gameLogger";
import dbconnect from "../../tools/dbconnect";

log.trace(`file found: gameModel`);
const MODEL_NAME = 'Game';

dbconnect();

/** @type mongoose.Schema */
let _GameSchema;
/** @type mongoose.model */
let _Game;

/**
 * Class contains static properties for the Game schema and model.
 */
export default class GameModel {
  /**
   * This property defines the Game schema.
   * @type mongoose.Schema
   * @readonly
   */
  static get GameSchema() {
    if (!_GameSchema) {
      log.info(`Define the schema for ${MODEL_NAME}`);
      _GameSchema = new mongoose.Schema({
        scores: [Number],
        dateCreated: { type: Date, default: Date.now },
        dateUpdated: { type: Date, default: Date.now }
      });
    }

    return _GameSchema;
  }

  /**
   * This property defines the Game data model.
   * @type mongoose.model
   * @readonly
   */
  static get Game() {
    if (!_Game) {
      log.info(`Define the model for ${MODEL_NAME}`);
      let s = GameModel.GameSchema;
      _Game = mongoose.model(MODEL_NAME, s);
    }

    return _Game;
  }

}