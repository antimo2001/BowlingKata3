import express from 'express';
import log from '../tools/log';
import userRoute from '../components/user/userRoute';
import playerRoute from '../components/player/playerRoute';
import gameRoute from '../components/game/gameRoute';

log.trace(`file found: components/index`);
const router = express.Router();

const sendOk = (req, res) => res.status(200).json({ status: 'ok' });
router.get('/api-status', sendOk);

router.use('/users', userRoute);
router.use('/players', playerRoute);
router.use('/games', gameRoute);

export default router;
