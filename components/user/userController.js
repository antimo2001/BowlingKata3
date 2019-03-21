import log from "../../tools/log";
import {UserService} from "./userService";

log.trace(`file found: UserController`);

/**
 * Class contains middleware for the /users route
 */
export class UserController {
  
  static resetModel(req) {
    //Reset the model
    req.model = new Map();
  }

  /** validate userId */
  static validateId(req, res, next, userId) {
    log.info(`Begin UserController.validateId`);
    UserController.resetModel(req);

    if (!userId) {
      let e = new Error('userId is not valid; cannot continue the resource');
      return next(Object.assign(e, { code: 500 }));
    }

    log.info({userId}, `userId is valid`);

    //Populate the model with data
    req.model.set('id', userId);
    // req.userId = userId;

    return next();
  }

  /** show listing of users */
  static list(req, res, next) {
    log.info(`Begin UserController.list`);
    try {
      // const userId = req.model.get('id');
      // log.info({userId}, `userId was set to`);

      //Define handlers
      const thenSend = (data) => {
        const yes = Object.assign(data, {
          success: true,
          results: data
        });
        return res.status(200).json(yes);
      }

      //Invoke data-service with handlers
      return UserService.list()
        .then(thenSend)
        .catch(error => {
          log.error(error, `Error from UserService.list`);
          return next(error);
        });
    }
    catch (error) {
      log.error(error, `Error during UserController.list`);
      let e = Object.assign(error, { code: 500 });
      return next(e);
    }
  }

  /** create new user */
  static create(req, res, next) {
    log.info(`Begin UserController.create`);
    try {
      UserController.resetModel(req);
      req.model = UserService.setModel(req.body);

      //Define handlers
      const thenSend = (data) => {
        return res.status(200).json({
          success: true,
          results: data,
          error: ''
        });
      }
      //Invoke data-service with handlers
      return UserService.create(req.model)
        .then(thenSend)
        .catch(error => {
          log.error(error, `Error from UserService.create`);
          return next(error);
        });
    }
    catch (error) {
      log.error(error, `Error during UserController.create`);
      let e = Object.assign(error, { code: 500 });
      return next(e);
    }
  }

  /** update existing user */
  static updateOne(req, res, next) {
    try {
      log.info(`Begin UserController.updateOne`);
      log.info(!!req.user, `req is truthy?`);
      return next({ message: 'Notyetimplemented' });
    }
    catch (error) {
      log.error(error, `Error during UserController.updateOne`);
      let e = Object.assign(error, { code: 500 });
      return next(e);
    }
  }

  /** delete existing user */
  static deleteOne(req, res, next) {
    try {
      log.info(`Begin UserController.deleteOne`);
      log.info(!!req.user, `req is truthy?`);
      return next({ message: 'Notyetimplemented' });
    }
    catch (error) {
      log.error(error, `Error during UserController.deleteOne`);
      let e = Object.assign(error, { code: 500 });
      return next(e);
    }
  }

}