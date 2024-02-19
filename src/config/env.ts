import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, PORT, DATABASE_URI } = process.env;

const env = {
  nodeEnv: String(NODE_ENV),
  port: Number(PORT),
  databaseUri: String(DATABASE_URI),
};

export default env;
