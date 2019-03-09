import express from 'express';
import log from "../../tools/log";
import {UserController} from "./userController";
log.trace(`file found: user/userRoute`);

const router = express.Router();

router.param('userId', UserController.validateId);

router.route('/:userId')
  .get(UserController.list)
  .post(UserController.create)
  .put(UserController.updateOne)
  .delete(UserController.deleteOne);

export default router;
