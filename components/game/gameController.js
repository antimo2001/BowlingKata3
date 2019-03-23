import log from "./gameLogger";
import { GameService } from "./gameService";
import sendOk from "../../tools/sendOk";
import sendError from "../../tools/sendError";
log.trace(`file found: GameController`);

/** @type GameService */
let _service;

/**
 * Class contains middleware for the /games route
 */
export class GameController {

  /** Setup the new data-service if request needs a new one */
  static setService(req, res, next) {
    if (!req.hasNewService) {
      log.info(`Instantiate new GameService; attach to req`);
      req.hasNewService = true;
      _service = new GameService();
    }
    return next();
  }

  /** Parse the given request-body */
  static parseBody(req, res, next) {
    if (!req.body) {
      return next();
    }
    try {
      log.info(`Begin GameController.parseBody`);
      const { body } = req;
      for (const p of Object.getOwnPropertyNames(body)) {
        _service.setKeyValue(p, body[p]);
      }
      log.info(_service._map.keys(), `_service._map.keys() are what?`);
      return next();
    }
    catch (error) {
      log.error(error, `Error during GameController.parseBody`);
      return next(sendError(error));
    }
  }

  /** Validate gameId */
  static validateId(req, res, next, gameId) {
    log.info(`Begin GameController.validateId`);
    try {
      if (!gameId) {
        let msg = `gameId is not valid; cannot send resource`;
        let err = new Error(msg);
        return next(sendError(err, 500, 'invalid_id'));
      }
      else {
        GameController.setService(req, res, () => {
          log.info({ gameId }, `Populate the model with valid id`);
          _service.gameId = gameId;
          return next();
        });
      }
    }
    catch (error) {
      log.fatal(error, `Error during GameController.validateId`);
      return next(sendError(error));
    }
  }

  /** Show listing of games */
  static list(req, res, next) {
    log.info(`Begin GameController.list`);
    try {
      return _service.list()
        .then(list => {
          return res.status(200).json(sendOk(list));
        })
        .catch(error => {
          log.error(error, `Error from GameService.list`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.fatal(error, `Error during GameController.list`);
      return next(sendError(error));
    }
  }

  /** Create new game */
  static create(req, res, next) {
    log.info(`Begin GameController.create`);
    try {
      return _service.create()
        .then(rcreate => {
          return res.status(200).json(sendOk(rcreate));
        })
        .catch(error => {
          log.error(error, `Error from GameService.create`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during GameController.create`);
      return next(sendError(error));
    }
  }

  /** Update existing game */
  static updateOne(req, res, next) {
    log.info(`Begin GameController.updateOne`);
    try {
      const { body } = req;
      return _service.updateOne(body)
        .then(rupdate => {
          return res.status(200).json(sendOk(rupdate));
        })
        .catch(error => {
          log.error(error, `Error during GameService.updateOne`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during GameController.updateOne`);
      return next(sendError(error));
    }
  }

  /** Delete existing game */
  static deleteOne(req, res, next) {
    log.info(`Begin GameController.deleteOne`);
    try {
      return _service.deleteOne()
        .then(rdelete => {
          return res.status(200).json(sendOk(rdelete));
        })
        .catch(error => {
          log.error(error, `Error during GameService.deleteOne`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during GameController.deleteOne`);
      return next(sendError(error));
    }
  }

}