import 'express-async-errors';
import express from 'express';
import compression from 'compression';

import './config/module-alias';
import { logger, env, connectToDatabase } from '@/config';
import router from './api/routes';
import errorMiddleware from './api/middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(compression());

app.use(router);

app.use(errorMiddleware);

connectToDatabase().then(() => {
  app.listen(env.port, () => {
    logger.info(`Server started on port: ${env.port}`);
  });
});
