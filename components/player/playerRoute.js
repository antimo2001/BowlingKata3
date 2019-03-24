import express from 'express';
import jsonMap from "../../tools/jsonMap";
import log from "./playerLogger";
import {PlayerController as Controller} from "./playerController";
log.trace(`file found: player/playerRoute`);

const router = express.Router();

router.param('playerId', Controller.validateId);

router.route('/:playerId')
  .all(jsonMap(), Controller.setService)
  .get(Controller.list)
  .delete(Controller.deleteOne)
  .put(Controller.updateOne);

router.route('/')
  .all(jsonMap(), Controller.setService)
  .get(Controller.list)
  .post(Controller.create);

export default router;
