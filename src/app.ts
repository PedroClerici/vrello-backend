import './config/module-alias';
import { logger, env, connectToDatabase } from '@/config';
import createServer from '@/config/server';

const app = createServer();

connectToDatabase().then(() => {
  app.listen(env.PORT, () => {
    logger.info(`Server started on port: ${env.PORT}`);
  });
});
