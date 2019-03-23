import log from "./playerLogger";
import {PlayerService} from "./playerService";
import sendOk from "../../tools/sendOk";
import sendError from "../../tools/sendError";
log.trace(`file found: PlayerController`);

/** @type PlayerService */
let _service;

/**
 * Class contains middleware for the /players route
 */
export class PlayerController {

  /** Setup the new data-service if request needs a new one */
  static setService(req, res, next) {
    if (!req.hasNewService) {
      log.info(`Instantiate new PlayerService; attach to req`);
      req.hasNewService = true;
      _service = new PlayerService();
    }
    return next();
  }

  /** Parse the given request-body */
  static parseBody(req, res, next) {
    if (!req.body) {
      return next();
    }
    try {
      log.info(`Begin PlayerController.parseBody`);
      const {body} = req;
      for (const p of Object.getOwnPropertyNames(body)) {
        _service.setKeyValue(p, body[p]);
      }
      log.info(_service._map.keys(), `_service._map.keys() are what?`);
      return next();
    }
    catch (error) {
      log.error(error, `Error during PlayerController.parseBody`);
      return next(sendError(error));
    }
  }

  /** Validate playerId */
  static validateId(req, res, next, playerId) {
    log.info(`Begin PlayerController.validateId`);
    try {
      if (!playerId) {
        let msg = `playerId is not valid; cannot send resource`;
        let err = new Error(msg);
        return next(sendError(err, 500, 'invalid_id'));
      }
      else {
        PlayerController.setService(req, res, () => {
          log.info({ playerId }, `Populate the model with valid id`);
          _service.playerId = playerId;
          return next();
        });
      }
    }
    catch (error) {
      log.fatal(error, `Error during PlayerController.validateId`);
      return next(sendError(error));
    }
  }

  /** Show listing of players */
  static list(req, res, next) {
    log.info(`Begin PlayerController.list`);
    try {
      return _service.list()
        .then(list => {
          return res.status(200).json(sendOk(list));
        })
        .catch(error => {
          log.error(error, `Error from PlayerService.list`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.fatal(error, `Error during PlayerController.list`);
      return next(sendError(error));
    }
  }

  /** Create new player */
  static create(req, res, next) {
    log.info(`Begin PlayerController.create`);
    try {
      return _service.create()
        .then(rcreate => {
          return res.status(200).json(sendOk(rcreate));
        })
        .catch(error => {
          log.error(error, `Error from PlayerService.create`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during PlayerController.create`);
      return next(sendError(error));
    }
  }

  /** Update existing player */
  static updateOne(req, res, next) {
    log.info(`Begin PlayerController.updateOne`);
    try {
      const { body } = req;
      return _service.updateOne(body)
        .then(rupdate => {
          return res.status(200).json(sendOk(rupdate));
        })
        .catch(error => {
          log.error(error, `Error during PlayerService.updateOne`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during PlayerController.updateOne`);
      return next(sendError(error));
    }
  }

  /** Delete existing player */
  static deleteOne(req, res, next) {
    log.info(`Begin PlayerController.deleteOne`);
    try {
      return _service.deleteOne()
        .then(rdelete => {
          return res.status(200).json(sendOk(rdelete));
        })
        .catch(error => {
          log.error(error, `Error during PlayerService.deleteOne`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during PlayerController.deleteOne`);
      return next(sendError(error));
    }
  }

}