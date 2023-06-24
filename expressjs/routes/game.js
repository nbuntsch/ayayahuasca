import express from 'express';
import gameService from '../services/game.service.js';

const router = express.Router();

router.get('/', gameService.get);

export default router;
