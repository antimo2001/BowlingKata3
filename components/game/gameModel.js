import mongoose from "mongoose";
import log from "./gameLogger";
import dbconnect from "../../tools/dbconnect";

log.trace(`file found: gameModel`);
const MODEL_NAME = 'Game';

dbconnect();

const g = {
  /** @type mongoose.Schema */
  GameSchema: null,
  /** @type mongoose.model */
  Game: null
}

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
    if (!g.GameSchema) {
      log.info(`Define the schema for ${MODEL_NAME}`);
      g.GameSchema = new mongoose.Schema({
        scores: [Number],
        dateCreated: { type: Date, default: Date.now },
        dateUpdated: { type: Date, default: Date.now }
      });
    }

    return g.GameSchema;
  }

  /**
   * This property defines the Game data model.
   * @type mongoose.model
   * @readonly
   */
  static get Game() {
    if (!g.Game) {
      log.info(`Define the model for ${MODEL_NAME}`);
      let s = GameModel.GameSchema;
      g.Game = mongoose.model(MODEL_NAME, s);
    }

    return g.Game;
  }

}