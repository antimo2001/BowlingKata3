import log from "../../tools/log";

log.info(`file found: userController`);


/**
 * Class contains middleware for the /users route
 */
export class UserController {
  constructor() {
    log.info(`Begin constructor.UserController()`);
  }

  static list(req, res, next) {
    log.info(`Begin userController.list`);
    log.info(!!req, `req is truthy?`);
    next();
  }

}