import log from "./gameLogger";
import { GameModel } from "./gameModel";
log.trace(`file found: gameService`);

const { Game } = GameModel;

export class GameService {
  constructor() {
    this._id = null;
  }

  /**
   * This property gets or sets the gameId
   */
  get gameId() {
    return this._id;
  }
  set gameId(value) {
    this._id = value;
  }

  /**
   * Fetch listing of games
   */
  list() {
    log.info(`Begin GameService.list`);
    try {
      let byId = !!this.gameId;
      let q = byId ? { _id: this.gameId } : {}
      log.info({ q }, `Where listing ${byId ? 'By gameId' : 'All'}`);
      return Game.find(q).select('-__v');
    }
    catch (error) {
      log.error(error, `Error during GameService.list`);
      throw error;
    }
  }

  /**
   * Create new game in database
   * @param {Map} jsonMap express-request body converted to a hashmap
   */
  create(jsonMap) {
    log.info(`Begin GameService.create`);
    try {
      const mapo = jsonMap.toObject();
      log.info({ mapo }, `Is mapo ready for save?`);
      const game = new Game(mapo);
      return game.save()
        .then(r => {
          log.info({ r }, `Successful game.save()`);
          return r;
        });
    }
    catch (error) {
      log.error(error, `Error during GameService.create`);
      throw error;
    }
  }

  /**
   * Update existing game
   * @param {Map} jsonMap express-request body converted to a hashmap
   */
  updateOne(jsonMap) {
    log.info(`Begin GameService.updateOne`);
    try {
      const uno = { _id: this.gameId };
      const mapo = jsonMap.toObject();
      log.info({ mapo }, `Is mapo ready for updateOne?`);
      return Game.updateOne(uno, mapo, { upsert: true });
    }
    catch (error) {
      log.error(error, `Error during GameService.updateOne`);
      throw error;
    }
  }

  /**
   * Delete existing game
   */
  deleteOne() {
    log.info(`Begin GameService.deleteOne`);
    try {
      const uno = { _id: this.gameId };
      return Game.deleteOne(uno);
    }
    catch (error) {
      log.error(error, `Error during GameService.deleteOne`);
      throw error;
    }
  }

}
