import express from 'express';
import jsonMap from "../../tools/jsonMap";
import log from "./gameLogger";
import { GameController as Controller } from "./gameController";
log.trace(`file found: game/gameRoute`);

const router = express.Router();

router.param('gameId', Controller.validateId);

router.route('/:gameId')
  .all(jsonMap(), Controller.setService)
  .get(Controller.list)
  .delete(Controller.deleteOne)
  .put(Controller.updateOne);

router.route('/')
  .all(jsonMap(), Controller.setService)
  .get(Controller.list)
  .post(Controller.create);

export default router;
