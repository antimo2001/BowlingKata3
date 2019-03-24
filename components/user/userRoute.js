import express from 'express';
import jsonMap from "../../tools/jsonMap";
import log from "./userLogger";
import { UserController as Controller } from "./userController";
log.trace(`file found: user/userRoute`);

const router = express.Router();

router.param('userId', Controller.validateId);

router.route('/:userId')
  .all(jsonMap(), Controller.setService)
  .get(Controller.list)
  .delete(Controller.deleteOne)
  .put(Controller.updateOne);

router.route('/')
  .all(jsonMap(), Controller.setService)
  .get(Controller.list)
  .post(Controller.create);

export default router;
