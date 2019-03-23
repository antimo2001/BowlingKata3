import log from "./gameLogger";
import { GameModel } from "./gameModel";
log.trace(`file found: gameService`);

const { Game } = GameModel;

export class GameService {
  constructor() {
    this._id = null;

    /** @type Map<string,any> */
    this._map = new Map();
  }

  /**
   * Set a key,value for this game
   * @param {String} key hashmap key
   * @param {*} value value
   */
  setKeyValue(key, value) {
    log.trace(`Begin GameService.setModel(${key}, ${value})`);
    this._map.set(key, value);
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
   * Convert this hashmap of game to Object
   * @readonly
   */
  get mapo() {
    let mo = {}
    for (const [p, v] of this._map.entries()) {
      mo[p] = v;
    }
    return mo;
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
   */
  create() {
    log.info(`Begin GameService.create`);
    try {
      const m = this.mapo;
      log.info({ m }, `Is mapo ready for save?`);
      const game = new Game(m);
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
   */
  updateOne() {
    log.info(`Begin GameService.updateOne`);
    try {
      const uno = { _id: this.gameId };
      const m = this.mapo;
      log.info({ m }, `Is mapo ready for updateOne?`);
      return Game.updateOne(uno, m, { upsert: true });
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
