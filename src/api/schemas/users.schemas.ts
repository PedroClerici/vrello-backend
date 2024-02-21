import { z } from 'zod';
import mongoose from 'mongoose';

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
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.instanceof(mongoose.Types.ObjectId),
  }),
});
