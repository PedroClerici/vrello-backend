import mongoose from 'mongoose';

import env from './env';
import logger from './logger';

mongoose.Promise = Promise;

const connectToDatabase = async () => {
  await mongoose.connect(env.DATABASE_URL);
};

mongoose.connection.on('connecting', () => {
  logger.info('Connecting to MongoDB...');
});

mongoose.connection.on('connected', () => {
  logger.info('Connected to database');
});

mongoose.connection.on('disconnected', () => {
  logger.fatal('Disconnected from database!');
});

mongoose.connection.on('error', (err: Error) =>
  logger.fatal('Error on connecting to database!', err),
);

export default connectToDatabase;
