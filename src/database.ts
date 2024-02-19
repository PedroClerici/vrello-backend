import mongoose from 'mongoose';

import { env, logger } from './config';

mongoose.Promise = Promise;

const connectToDatabase = async () => {
  await mongoose.connect(env.databaseUri);
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

mongoose.connection.on('error', (error: Error) =>
  logger.fatal('Error on connecting to database!', error),
);

export default connectToDatabase;
