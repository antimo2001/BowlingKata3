import express from 'express';
import log from "../../tools/log";
import {UserController} from "./userController";
log.info(`file found: user/userRoute`);

const router = express.Router();

router.route('/users', UserController.list);

export default router;
