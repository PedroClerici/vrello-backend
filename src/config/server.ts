import 'express-async-errors';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import router from '@/api/routes';
import errorMiddleware from '@/api/middlewares/error.middleware';

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(compression());

  app.use(router);

  app.use(errorMiddleware);

  return app;
};

export default createServer;
