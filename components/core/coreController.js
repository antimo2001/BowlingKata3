import log from "./coreLogger";
import { CoreService } from "./coreService";
import sendOk from "../../tools/sendOk";
import sendError from "../../tools/sendError";
log.trace(`file found: CoreController`);

/** @type CoreService */
let _service;

/**
 * Class contains middleware for the /cores route
 * 
 * HowTo: use this as a template for copy/paste; Replace "Core" with the
 * name of the datamodel.
 *
 */
export class CoreController {

  /** Setup the new data-service if request needs a new one */
  static setService(req, res, next) {
    if (!req.hasNewService) {
      log.info(`Instantiate new CoreService; attach to req`);
      req.hasNewService = true;
      _service = new CoreService();
    }
    return next();
  }

  /** Validate coreId */
  static validateId(req, res, next, coreId) {
    log.info(`Begin CoreController.validateId`);
    try {
      if (!coreId) {
        let msg = `coreId is not valid; cannot send resource`;
        let err = new Error(msg);
        return next(sendError(err, 500, 'invalid_id'));
      }
      else {
        CoreController.setService(req, res, () => {
          log.info({ coreId }, `Populate the model with valid id`);
          _service.coreId = coreId;
          return next();
        });
      }
    }
    catch (error) {
      log.fatal(error, `Error during CoreController.validateId`);
      return next(sendError(error));
    }
  }

  /** Show listing of cores */
  static list(req, res, next) {
    log.info(`Begin CoreController.list`);
    try {
      return _service.list()
        .then(list => {
          return res.status(200).json(sendOk(list));
        })
        .catch(error => {
          log.error(error, `Error from CoreService.list`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.fatal(error, `Error during CoreController.list`);
      return next(sendError(error));
    }
  }

  /** Create new core */
  static create(req, res, next) {
    log.info(`Begin CoreController.create`);
    try {
      const { jsonMap } = req;
      return _service.create(jsonMap)
        .then(rcreate => {
          return res.status(200).json(sendOk(rcreate));
        })
        .catch(error => {
          log.error(error, `Error from CoreService.create`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during CoreController.create`);
      return next(sendError(error));
    }
  }

  /** Update existing core */
  static updateOne(req, res, next) {
    log.info(`Begin CoreController.updateOne`);
    try {
      const { jsonMap } = req;
      return _service.updateOne(jsonMap)
        .then(rupdate => {
          return res.status(200).json(sendOk(rupdate));
        })
        .catch(error => {
          log.error(error, `Error during CoreService.updateOne`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during CoreController.updateOne`);
      return next(sendError(error));
    }
  }

  /** Delete existing core */
  static deleteOne(req, res, next) {
    log.info(`Begin CoreController.deleteOne`);
    try {
      return _service.deleteOne()
        .then(rdelete => {
          return res.status(200).json(sendOk(rdelete));
        })
        .catch(error => {
          log.error(error, `Error during CoreService.deleteOne`);
          return next(sendError(error));
        });
    }
    catch (error) {
      log.error(error, `Error during CoreController.deleteOne`);
      return next(sendError(error));
    }
  }

}