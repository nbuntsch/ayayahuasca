import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import game from './routes/game.js';

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use('/api/game', game);

app.listen(2222, () => {
  console.log('API running on port 2222');
});

export default app;
