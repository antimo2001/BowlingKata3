import express from 'express';
import jsonMap from "../../tools/jsonMap";
import log from "../../components/core/coreLogger";
import { CoreController as Controller } from "../../components/core/coreController";
log.trace(`file found: PROJECTROOT/tests/prac0/coreRoute`);

const router = express.Router();

router.param('coreId', Controller.validateId);

router.route('/:coreId')
  .all(jsonMap(), Controller.setService)
  .get(Controller.list)
  .delete(Controller.deleteOne)
  .put(Controller.updateOne);

router.route('/')
  .all(jsonMap(), Controller.setService)
  .get(Controller.list)
  .post(Controller.create);

export default router;
