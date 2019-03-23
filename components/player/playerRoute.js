import express from 'express';
import log from "./playerLogger";
import {PlayerController as Controller} from "./playerController";
log.trace(`file found: player/playerRoute`);

const router = express.Router();

router.route('/').all(
  Controller.setService,
  Controller.parseBody,
);

router.param('playerId', Controller.validateId);

router.route('/:playerId').put(Controller.updateOne);
router.route('/:playerId').delete(Controller.deleteOne);
router.route('/:playerId').get(Controller.list);

router.route('/').get(Controller.list);
router.route('/').post(Controller.create);

export default router;
