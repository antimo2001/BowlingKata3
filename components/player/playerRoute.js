import express from 'express';
// import log from "../../tools/log";
import log from "./playerLogger";
import {PlayerController} from "./playerController";
log.trace(`file found: player/playerRoute`);

const router = express.Router();

router.param('playerId', PlayerController.validateId);

router.route('/list').get(PlayerController.list);
router.route('/create').post(PlayerController.create);

router.route('/:playerId').put(PlayerController.updateOne);
router.route('/:playerId').delete(PlayerController.deleteOne);

export default router;
