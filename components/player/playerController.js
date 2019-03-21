// import log from "../../tools/log";
import log from "./playerLogger";
import {PlayerService} from "./playerService";

log.trace(`file found: PlayerController`);

/**
 * Class contains middleware for the /players route
 */
export class PlayerController {
  
  static resetModel(req) {
    //Reset the model
    req.model = new Map();
  }

  /** validate playerId */
  static validateId(req, res, next, playerId) {
    log.info(`Begin PlayerController.validateId`);
    PlayerController.resetModel(req);

    if (!playerId) {
      let e = new Error('playerId is not valid; cannot continue the resource');
      return next(Object.assign(e, { code: 500 }));
    }

    log.info({playerId}, `playerId is valid`);

    //Populate the model with data
    req.model.set('id', playerId);
    // req.playerId = playerId;

    return next();
  }

  /** show listing of players */
  static list(req, res, next) {
    log.info(`Begin PlayerController.list`);
    try {
      // const playerId = req.model.get('id');
      // log.info({playerId}, `playerId was set to`);

      //Define handlers
      const thenSend = (data) => {
        const yes = Object.assign(data, {
          success: true,
          results: data
        });
        return res.status(200).json(yes);
      }

      //Invoke data-service with handlers
      return PlayerService.list()
        .then(thenSend)
        .catch(error => {
          log.error(error, `Error from PlayerService.list`);
          return next(error);
        });
    }
    catch (error) {
      log.error(error, `Error during PlayerController.list`);
      let e = Object.assign(error, { code: 500 });
      return next(e);
    }
  }

  /** create new player */
  static create(req, res, next) {
    log.info(`Begin PlayerController.create`);
    try {
      // PlayerController.resetModel(req);
      req.model = PlayerService.setModel(req.body);

      //Define handlers
      const thenSend = (data) => {
        return res.status(200).json({
          success: true,
          results: data,
          error: ''
        });
      }
      //Invoke data-service with handlers
      return PlayerService.create(req.model)
        .then(thenSend)
        .catch(error => {
          log.error(error, `Error from PlayerService.create`);
          return next(error);
        });
    }
    catch (error) {
      log.error(error, `Error during PlayerController.create`);
      let e = Object.assign(error, { code: 500 });
      return next(e);
    }
  }

  /** update existing player */
  static updateOne(req, res, next) {
    try {
      log.info(`Begin PlayerController.updateOne`);
      log.info(!!req.player, `req is truthy?`);
      return next({ message: 'Notyetimplemented' });
    }
    catch (error) {
      log.error(error, `Error during PlayerController.updateOne`);
      let e = Object.assign(error, { code: 500 });
      return next(e);
    }
  }

  /** delete existing player */
  static deleteOne(req, res, next) {
    try {
      log.info(`Begin PlayerController.deleteOne`);
      log.info(!!req.player, `req is truthy?`);
      return next({ message: 'Notyetimplemented' });
    }
    catch (error) {
      log.error(error, `Error during PlayerController.deleteOne`);
      let e = Object.assign(error, { code: 500 });
      return next(e);
    }
  }

}