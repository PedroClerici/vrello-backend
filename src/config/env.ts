import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, PORT, DATABASE_URI, SALT_ROUNDS, JWT_PASS } = process.env;

const env = {
  nodeEnv: String(NODE_ENV),
  port: Number(PORT),
  databaseUri: String(DATABASE_URI),
  saltRounds: Number(SALT_ROUNDS),
  jwtPass: String(JWT_PASS),
};

export default env;
