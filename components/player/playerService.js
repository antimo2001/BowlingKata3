import log from "./playerLogger";
import {PlayerModel} from "./playerModel";
log.trace(`file found: playerService`);

const {Player} = PlayerModel;

export class PlayerService {
  constructor() {
    this._id = null;
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
   * @param {Map} jsonMap express-request body converted to a hashmap
   */
  create(jsonMap) {
    log.info(`Begin PlayerService.create`);
    try {
      const mapo = jsonMap.toObject();
      log.info({mapo}, `Is mapo ready for save?`);
      const player = new Player(mapo);
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
   * @param {Map} jsonMap express-request body converted to a hashmap
   */
  updateOne(jsonMap) {
    log.info(`Begin PlayerService.updateOne`);
    try {
      const uno = {_id: this.playerId};
      const mapo = jsonMap.toObject();
      log.info({ mapo }, `Is mapo ready for updateOne?`);
      return Player.updateOne(uno, mapo, {upsert: true});
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
