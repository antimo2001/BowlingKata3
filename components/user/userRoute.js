import express from 'express';
// import log from "../../tools/log";
import log from "./userLogger";
import {UserController} from "./userController";
log.trace(`file found: user/userRoute`);

const router = express.Router();

router.param('userId', UserController.validateId);

router.route('/list').get(UserController.list);
router.route('/create').post(UserController.create);

router.route('/:userId').put(UserController.updateOne);
router.route('/:userId').delete(UserController.deleteOne);

export default router;
