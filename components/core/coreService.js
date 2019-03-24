import log from "./coreLogger";
import { CoreModel } from "./coreModel";
log.trace(`file found: coreService`);

const { Core } = CoreModel;

/**
 * Class contains middleware for the /cores route
 *
 * HowTo: use this as a template for copy/paste; Replace "Core" with the
 * name of the datamodel.
 *
 */
export class CoreService {
  constructor() {
    this._id = null;
  }

  /**
   * This property gets or sets the coreId
   */
  get coreId() {
    return this._id;
  }
  set coreId(value) {
    this._id = value;
  }

  /**
   * Fetch listing of cores
   */
  list() {
    log.info(`Begin CoreService.list`);
    try {
      let byId = !!this.coreId;
      let q = byId ? { _id: this.coreId } : {}
      log.info({ q }, `Where listing ${byId ? 'By coreId' : 'All'}`);
      return Core.find(q).select('-__v');
    }
    catch (error) {
      log.error(error, `Error during CoreService.list`);
      throw error;
    }
  }

  /**
   * Create new core in database
   * @param {Map} jsonMap express-request body converted to a hashmap
   */
  create(jsonMap) {
    log.info(`Begin CoreService.create`);
    try {
      const mapo = jsonMap.toObject();
      log.info({ mapo }, `Is mapo ready for save?`);
      const core = new Core(mapo);
      return core.save()
        .then(r => {
          log.info({ r }, `Successful core.save()`);
          return r;
        });
    }
    catch (error) {
      log.error(error, `Error during CoreService.create`);
      throw error;
    }
  }

  /**
   * Update existing core
   * @param {Map} jsonMap express-request body converted to a hashmap
   */
  updateOne(jsonMap) {
    log.info(`Begin CoreService.updateOne`);
    try {
      const uno = { _id: this.coreId };
      const mapo = jsonMap.toObject();
      log.info({ mapo }, `Is mapo ready for updateOne?`);
      return Core.updateOne(uno, mapo, { upsert: true });
    }
    catch (error) {
      log.error(error, `Error during CoreService.updateOne`);
      throw error;
    }
  }

  /**
   * Delete existing core
   */
  deleteOne() {
    log.info(`Begin CoreService.deleteOne`);
    try {
      const uno = { _id: this.coreId };
      return Core.deleteOne(uno);
    }
    catch (error) {
      log.error(error, `Error during CoreService.deleteOne`);
      throw error;
    }
  }

}
