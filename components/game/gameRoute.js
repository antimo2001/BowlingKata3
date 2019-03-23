import express from 'express';
import bodyparser from 'body-parser';
import log from "./gameLogger";
import { GameController as Controller } from "./gameController";
log.trace(`file found: game/gameRoute`);

const router = express.Router();
const jsonparser = bodyparser.json();

router.route('/').all(Controller.setService);

router.param('gameId', Controller.validateId);

router.route('/:gameId').delete(Controller.deleteOne);

router.route('/:gameId').get(Controller.list);
router.route('/').get(Controller.list);

router.route('/:gameId').put(
  jsonparser,
  Controller.parseBody,
  Controller.updateOne
);

router.route('/').post(
  jsonparser,
  Controller.parseBody,
  Controller.create
);

export default router;
