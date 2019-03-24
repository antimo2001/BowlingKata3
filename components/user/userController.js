import log from "./userLogger";
import { UserService } from "./userService";
import sendOk from "../../tools/sendOk";
import sendError from "../../tools/sendError";
log.trace(`file found: UserController`);

/** @type UserService */
let _service;

/**
 * Class contains middleware for the /users route
 */
export class UserController {

  /** Setup the new data-service if request needs a new one */
  static setService(req, res, next) {
    if (!req.hasNewService) {
      log.info(`Instantiate new UserService; attach to req`);
      req.hasNewService = true;
      _service = new UserService();
    }
    return next();
  }

  /** Validate userId */
  static validateId(req, res, next, userId) {
    log.info(`Begin UserController.validateId`);
    try {
      if (!userId) {
        let msg = `userId is not valid; cannot send resource`;
        let err = new Error(msg);
        return next(sendError(err, 500, 'invalid_id'));
      }
      else {
        UserController.setService(req, res, () => {
          log.info({ userId }, `Populate the model with valid id`);
          _service.userId = userId;
          return next();
        });
      }
    }
    catch (error) {
      log.fatal(error, `Error during UserController.validateId`);
      return next(sendError(error));
    }
  }

  /** Show listing of users */
  static list(req, res, next) {
    log.info(`Begin UserController.list`);
    try {
      return _service.list()
        .then(list => {
          return res.status(200).json(sendOk(list));
        })
        .catch(error => {
          log.error(error, `Error from UserService.list`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.fatal(error, `Error during UserController.list`);
      return next(sendError(error));
    }
  }

  /** Create new user */
  static create(req, res, next) {
    log.info(`Begin UserController.create`);
    try {
      const { jsonMap } = req;
      return _service.create(jsonMap)
        .then(rcreate => {
          return res.status(200).json(sendOk(rcreate));
        })
        .catch(error => {
          log.error(error, `Error from UserService.create`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during UserController.create`);
      return next(sendError(error));
    }
  }

  /** Update existing user */
  static updateOne(req, res, next) {
    log.info(`Begin UserController.updateOne`);
    try {
      const { jsonMap } = req;
      return _service.updateOne(jsonMap)
        .then(rupdate => {
          return res.status(200).json(sendOk(rupdate));
        })
        .catch(error => {
          log.error(error, `Error during UserService.updateOne`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during UserController.updateOne`);
      return next(sendError(error));
    }
  }

  /** Delete existing user */
  static deleteOne(req, res, next) {
    log.info(`Begin UserController.deleteOne`);
    try {
      return _service.deleteOne()
        .then(rdelete => {
          return res.status(200).json(sendOk(rdelete));
        })
        .catch(error => {
          log.error(error, `Error during UserService.deleteOne`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during UserController.deleteOne`);
      return next(sendError(error));
    }
  }

}