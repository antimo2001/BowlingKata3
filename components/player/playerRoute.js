import express from 'express';
import bodyparser from 'body-parser';
import log from "./playerLogger";
import {PlayerController as Controller} from "./playerController";
log.trace(`file found: player/playerRoute`);

const router = express.Router();
const jsonparser = bodyparser.json();

router.route('/').all(Controller.setService);

router.param('playerId', Controller.validateId);

router.route('/:playerId').delete(Controller.deleteOne);

router.route('/:playerId').get(Controller.list);
router.route('/').get(Controller.list);

router.route('/:playerId').put(
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
