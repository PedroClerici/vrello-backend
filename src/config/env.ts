import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(['production', 'development', 'test'])
    .optional()
    .default('development'),
  PORT: z.coerce.number().optional().default(3000),
  DATABASE_URL: z.string().url(),
  SALT_ROUNDS: z.coerce.number().optional().default(8),
  JWT_PASS: z.string(),
  JWT_TOKEN_EXPIRE: z.string().optional().default('5m'),
  JWT_REFRESH_TOKEN_EXPIRE: z.string().optional().default('7d'),
});

const env = envSchema.safeParse(process.env);

if (env.success === false) {
  console.error('Invalid environment variables!', env.error.issues);

  throw new Error('Invalid environment variables!');
}

export default env.data;
