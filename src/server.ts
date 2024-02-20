import express from 'express';
import compression from 'compression';

import './config/module-alias';
import { logger, env, connectToDatabase } from '@/config';
import router from '@/api/routes';

const app = express();

app.use(express.json());
app.use(compression());

app.use(router);

connectToDatabase().then(() => {
  app.listen(env.port, () => {
    logger.info(`Server started on port: ${env.port}`);
  });
});
