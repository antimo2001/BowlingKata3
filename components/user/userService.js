import log from "../../tools/log";
log.trace(`file found: userService`);

export class UserService {
  /**
   *
   * @param {hexstring} userId the userId to use to fetch user data
   */
  static list(userId) {
    log.info({userId}, `Begin UserService.list`);
    const mockdata = {
      name: `Alice Apple ${userId}`,
      firstName: `Alice`,
      lastName: `Apple`,
      id: userId,
    }
    return Promise.resolve(mockdata);
  }
  /**
   *
   * @param {Map<string,value>} model the data to insert and create user
   */
  static create(model) {
    log.info({ model }, `Begin UserService.create`);
    const mockdata = {
      method: `UserService.create`,
      n: 1
    }
    return Promise.resolve(mockdata);
  }

}
