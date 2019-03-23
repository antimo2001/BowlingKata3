import log from "./playerLogger";
import {PlayerModel} from "./playerModel";
log.trace(`file found: playerService`);

const {Player} = PlayerModel;

export class PlayerService {
  constructor() {
    this._id = null;

    /** @type Map<string,any> */
    this._map = new Map();
  }

  /**
   * Set a key,value for this player
   * @param {String} key hashmap key
   * @param {*} value value
   */
  setKeyValue(key, value) {
    log.trace(`Begin PlayerService.setModel(${key}, ${value})`);
    this._map.set(key, value);
  }

  /**
   * This property gets or sets the playerId
   */
  get playerId() {
    return this._id;
  }
  set playerId(value) {
    this._id = value;
  }

  /**
   * Convert this hashmap of player to Object
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
   * Fetch listing of players
   */
  list() {
    log.info(`Begin PlayerService.list`);
    try {
      let byId = !!this.playerId;
      let q = byId ? {_id: this.playerId} : {}
      log.info({ q }, `Where listing ${byId ? 'By playerId' : 'All'}`);
      return Player.find(q).select('-__v');
    }
    catch (error) {
      log.error(error, `Error during PlayerService.list`);
      throw error;
    }
  }

  /**
   * Create new player in database
   */
  create() {
    log.info(`Begin PlayerService.create`);
    try {
      const m = this.mapo;
      log.info({m}, `Is mapo ready for save?`);
      const player = new Player(m);
      return player.save()
        .then(r => {
          log.info({r}, `Successful player.save()`);
          return r;
        });
    }
    catch (error) {
      log.error(error, `Error during PlayerService.create`);
      throw error;
    }
  }

  /**
   * Update existing player
   */
  updateOne() {
    log.info(`Begin PlayerService.updateOne`);
    try {
      const uno = {_id: this.playerId};
      const m = this.mapo;
      log.info({ m }, `Is mapo ready for updateOne?`);
      return Player.updateOne(uno, m, {upsert: true});
    }
    catch (error) {
      log.error(error, `Error during PlayerService.updateOne`);
      throw error;
    }
  }

  /**
   * Delete existing player
   */
  deleteOne() {
    log.info(`Begin PlayerService.deleteOne`);
    try {
      const uno = { _id: this.playerId };
      return Player.deleteOne(uno);
    }
    catch (error) {
      log.error(error, `Error during PlayerService.deleteOne`);
      throw error;
    }
  }

}
