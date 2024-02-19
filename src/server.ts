import express, { type Request, type Response } from 'express';

import './config/module-alias';
import { logger, env } from '@/config';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ hello: 'world' });
});

app.listen(env.port, () => {
  logger.info(`Server listening on port ${env.port}!`);
});
