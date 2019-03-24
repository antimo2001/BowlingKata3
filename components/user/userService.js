import log from "./userLogger";
import { UserModel } from "./userModel";
log.trace(`file found: userService`);

const { User } = UserModel;

export class UserService {
  constructor() {
    this._id = null;
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
   * @param {Map} jsonMap express-request body converted to a hashmap
   */
  create(jsonMap) {
    log.info(`Begin UserService.create`);
    try {
      const mapo = jsonMap.toObject();
      log.info({ mapo }, `Is mapo ready for save?`);
      const user = new User(mapo);
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
   * @param {Map} jsonMap express-request body converted to a hashmap
   */
  updateOne(jsonMap) {
    log.info(`Begin UserService.updateOne`);
    try {
      const uno = { _id: this.userId };
      const mapo = jsonMap.toObject();
      log.info({ mapo }, `Is mapo ready for updateOne?`);
      return User.updateOne(uno, mapo, { upsert: true });
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
