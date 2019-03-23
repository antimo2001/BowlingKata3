import mongoose from "mongoose";
import log from "./playerLogger";
import GameModel from "../game/gameModel";
// import dbconnect from "../../tools/dbconnect";

log.trace(`file found: playerModel`);
const MODEL_NAME = 'Player';

/** @type mongoose.Schema */
let _PlayerSchema;
/** @type mongoose.model */
let _Player;

/**
 * Class contains static properties for the Player schema and model.
 */
export default class PlayerModel {
  /**
   * This property defines the Player schema.
   * @type mongoose.Schema
   * @readonly
   */
  static get PlayerSchema() {
    if (!_PlayerSchema) {
      log.info(`Define the schema for ${MODEL_NAME}`);
      let {GameSchema} = GameModel;
      _PlayerSchema = new mongoose.Schema({
        displayName: String,
        games: [GameSchema],
        dateCreated: { type: Date, default: Date.now },
        dateUpdated: { type: Date, default: Date.now }
      });
    }

    return _PlayerSchema;
  }

  /**
   * This property defines the Player data model.
   * @type mongoose.model
   * @readonly
   */
  static get Player() {
    if (!_Player) {
      log.info(`Define the model for ${MODEL_NAME}`);
      let s = PlayerModel.PlayerSchema;
      _Player = mongoose.model(MODEL_NAME, s);
    }

    return _Player;
  }

}