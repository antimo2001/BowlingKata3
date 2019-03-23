import express from 'express';
import log from "./playerLogger";
import {PlayerController} from "./playerController";
log.trace(`file found: player/playerRoute`);

const router = express.Router();

router.route('/').all(
  PlayerController.setService,
  PlayerController.parseBody,
);

router.param('playerId', PlayerController.validateId);

router.route('/:playerId').put(PlayerController.updateOne);
router.route('/:playerId').delete(PlayerController.deleteOne);

router.route('/').get(PlayerController.list);
router.route('/').post(PlayerController.create);

export default router;
