import express from 'express';
// import bodyparser from 'body-parser';
import jsonMap from "../../tools/jsonMap";
import log from "./userLogger";
import { UserController as Controller } from "./userController";
log.trace(`file found: user/userRoute`);

const router = express.Router();
// const jsonparser = bodyparser.json();

router.route('/').all(jsonMap(), Controller.setService);

router.param('userId', Controller.validateId);

router.route('/:userId').delete(Controller.deleteOne);

router.route('/:userId').get(Controller.list);
router.route('/').get(Controller.list);

router.route('/:userId').put(Controller.updateOne);

router.route('/').post(Controller.create);

export default router;
