import express from 'express';
import gameService from '../services/game.service.js';

const router = express.Router();

router.get('/get/:gameId', gameService.get);
router.post('/create', gameService.create);
router.post('/start/:gameId', gameService.start);

export default router;
