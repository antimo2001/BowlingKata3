// import log from "../../tools/log";
import log from "./playerLogger";
import PlayerModel from "./playerModel";
log.trace(`file found: playerService`);

const {Player} = PlayerModel;

export class PlayerService {
  /**
   * Fetches list of players
   * @param {hexstring} playerId the playerId to use to fetch player data
   * @returns Promise<Player[]>
   */
  static list(playerId = null) {
    log.info({playerId}, `Begin PlayerService.list`);
    
    if (!playerId) {
      log.info(`Fetch all players`);
      return Player.find();
    }
    else {
      log.info({playerId}, `Fetch one player`);
      return Player.find({_id: playerId});
    }
  }
  /**
   * Creates new player in database
   * @param {Map<string,value>} body the data to insert and create player
   */
  static create(body) {
    log.info(`Begin PlayerService.create`);
    try {
      const displayName = body.get('displayName');
      // const games = body.get('games');
      let player = new Player({ displayName });
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
   * Create hashmap given the request-body
   * @param {any} body expressjs-request-body
   * @returns Map<string, any>
   */
  static setModel(body) {
    log.info(`Begin PlayerService.setModel`);
    let m = new Map();
    try {
      log.info(Object.getOwnPropertyNames(body));
      let {displayName} = body;
      m.set('displayName', displayName);
      // m.set('games', games);
      log.info({displayName}, `Done setModel`);
    }
    catch (error) {
      log.error(error, `Error during PlayerService.setModel`);
      throw error;
    }
    return m;
  }

}
