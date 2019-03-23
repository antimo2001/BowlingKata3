import log from "./playerLogger";
import PlayerModel from "./playerModel";
log.trace(`file found: playerService`);

const {Player} = PlayerModel;

export class PlayerService {
  constructor() {
    this._id = null;

    /** @type string[] */
    this._props = [];

    /** @type Map<string,any> */
    this._map = new Map();
  }

  /**
   * Set a key,value for this player
   * @param {String} key hashmap key
   * @param {*} value value
   */
  setKeyValue(key, value) {
    log.info(`Begin PlayerService.setModel(${key}, ${value})`);
    this._props.push(key);
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
   * Get the hashmap of this player as an Object
   * @readonly
   */
  get mapo() {
    let mo = {}
    for (const p of this._props) {
      mo[p] = this._map.get(p);
    }
    return mo;
  }

  /**
   * Fetches list of players
   */
  list() {
    log.info(`Begin PlayerService.list`);
    try {
      let playerId = this._map.get('id');
      if (!playerId) {
        log.info(`Fetch all players`);
        return Player.find();
      }
      else {
        log.info({playerId}, `Fetch one player`);
        return Player.find({_id: playerId});
      }
    }
    catch (error) {
      log.error(error, `Error during PlayerService.list`);
      throw error;
    }
  }

  /**
   * Creates new player in database
   */
  create() {
    log.info(`Begin PlayerService.create`);
    try {
      let m = this.mapo;
      log.info(m, `this.mapo looks ready for player.save?`);
      let player = new Player(m);
      return player.save()
        .then(r => {
          log.info({player}, `Successful player.save()`);
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
  updateOne(body) {
    log.info(`Begin PlayerService.updateOne`);
    try {
      const playerId = this._map.get('id');
      return User.findOneAndUpdate()
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
      throw new Error(`NotYetImplemented`);
    }
    catch (error) {
      log.error(error, `Error during PlayerService.deleteOne`);
      throw error;
    }
  }

}
