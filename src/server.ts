import express, { type Request, type Response } from 'express';

import './config/module-alias';
import { logger, env } from '@/config';
import connectToDatabase from '@/database';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ hello: 'world' });
});

connectToDatabase().then(() => {
  app.listen(env.port, () => {
    logger.info(`Server started on port: ${env.port}`);
  });
});
