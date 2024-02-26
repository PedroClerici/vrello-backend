import { z } from 'zod';

// eslint-disable-next-line import/prefer-default-export
export const registerSchema = z.object({
  body: z.object({
    email: z.string().email().trim(),
    username: z.string().trim(),
    password: z.string().min(5).max(100),
  }),
});
