import express from 'express';
import log from '../tools/log';
import userRoute from '../components/user/userRoute';
// import playerRoute from '../components/player/playerRoute';
// import gameRoute from '../components/game/gameRoute';

log.info(`file found: components/routes`);
const router = express.Router();

router.get('/api-status', (req, res) => res.status(200).json({ status: 'ok' }));

router.use('/users', userRoute);

// router.use('/players', playerRoute);

// router.use('/games', gameRoute);

export default router;
