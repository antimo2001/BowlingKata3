import log from "./userLogger";
import { UserModel } from "./userModel";
log.trace(`file found: userService`);

const { User } = UserModel;

export class UserService {
  constructor() {
    this._id = null;

    /** @type Map<string,any> */
    this._map = new Map();
  }

  /**
   * Set a key,value for this user
   * @param {String} key hashmap key
   * @param {*} value value
   */
  setKeyValue(key, value) {
    log.trace(`Begin UserService.setModel(${key}, ${value})`);
    this._map.set(key, value);
  }

  /**
   * This property gets or sets the userId
   */
  get userId() {
    return this._id;
  }
  set userId(value) {
    this._id = value;
  }

  /**
   * Convert this hashmap of user to Object
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
   * Fetch listing of users
   */
  list() {
    log.info(`Begin UserService.list`);
    try {
      let byId = !!this.userId;
      let q = byId ? { _id: this.userId } : {}
      log.info({ q }, `Where listing ${byId ? 'By userId' : 'All'}`);
      return User.find(q).select('-__v');
    }
    catch (error) {
      log.error(error, `Error during UserService.list`);
      throw error;
    }
  }

  /**
   * Create new user in database
   */
  create() {
    log.info(`Begin UserService.create`);
    try {
      const m = this.mapo;
      log.info({ m }, `Is mapo ready for save?`);
      const user = new User(m);
      return user.save()
        .then(r => {
          log.info({ r }, `Successful user.save()`);
          return r;
        });
    }
    catch (error) {
      log.error(error, `Error during UserService.create`);
      throw error;
    }
  }

  /**
   * Update existing user
   */
  updateOne() {
    log.info(`Begin UserService.updateOne`);
    try {
      const uno = { _id: this.userId };
      const m = this.mapo;
      log.info({ m }, `Is mapo ready for updateOne?`);
      return User.updateOne(uno, m, { upsert: true });
    }
    catch (error) {
      log.error(error, `Error during UserService.updateOne`);
      throw error;
    }
  }

  /**
   * Delete existing user
   */
  deleteOne() {
    log.info(`Begin UserService.deleteOne`);
    try {
      const uno = { _id: this.userId };
      return User.deleteOne(uno);
    }
    catch (error) {
      log.error(error, `Error during UserService.deleteOne`);
      throw error;
    }
  }

}
