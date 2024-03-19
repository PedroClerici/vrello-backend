import { z } from 'zod';
import { Types, isValidObjectId } from 'mongoose';

export const userRequestSchema = z.object({
  id: z.string().refine((id) => isValidObjectId(id)),
  email: z.string().email().trim().toLowerCase(),
  username: z.string().trim(),
  password: z.string().min(5),
});

export const userResponseSchema = z.object({
  id: z.instanceof(Types.ObjectId),
  email: z.string().email().trim().toLowerCase(),
  username: z.string().trim(),
});
