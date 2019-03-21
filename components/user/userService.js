// import log from "../../tools/log";
import log from "./userLogger";
import User from "./userModel";
log.trace(`file found: userService`);

export class UserService {
  /**
   * Fetches list of users
   * @param {hexstring} userId the userId to use to fetch user data
   * @returns Promise<User[]>
   */
  static list(userId = null) {
    log.info({userId}, `Begin UserService.list`);
    
    if (!userId) {
      log.info(`Fetch all users`);
      return User.find();
    }
    else {
      log.info({userId}, `Fetch one user`);
      return User.find({_id: userId});
    }
  }
  /**
   * Creates new user in database
   * @param {Map<string,value>} model the data to insert and create user
   */
  static create(model) {
    log.info(`Begin UserService.create`);
    try {
      const username = model.get('username');
      const secret = model.get('secret');
      const email = model.get('email');
      let user = new User({ username, secret, email });
      return user.save()
        .then(r => {
          log.info({user}, `Successful user.save()`);
          return r;
        });
    }
    catch (error) {
      log.error(error, `Error during UserService.create`);
      throw error;
    }
  }
  /**
   * Create hashmap given the request-body
   * @param {any} body expressjs-request-body
   * @returns Map<string, any>
   */
  static setModel(body) {
    log.info(`Begin UserService.setModel`);
    let m = new Map();
    try {
      log.info(Object.getOwnPropertyNames(body));
      let {username, secret, email} = body;
      m.set('username', username);
      m.set('secret', secret);
      m.set('email', email);
      log.info({username, secret, email}, `Done setModel`);
    }
    catch (error) {
      log.error(error, `Error during UserService.setModel`);
      throw error;
    }
    return m;
  }

}
