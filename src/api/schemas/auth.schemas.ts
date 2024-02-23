import { z } from 'zod';

// eslint-disable-next-line import/prefer-default-export
export const createUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email')
      .trim(),
    username: z
      .string({
        required_error: 'Username is required',
      })
      .trim(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(5)
      .max(100),
  }),
});
