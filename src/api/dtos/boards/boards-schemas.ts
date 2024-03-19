import { z } from 'zod';
import { Types, isValidObjectId } from 'mongoose';

export const boardRequestSchema = z.object({
  id: z.string().refine((id) => isValidObjectId(id)),
  title: z.string().trim(),
  author: z
    .string()
    .refine((author) => isValidObjectId(author))
    .transform((author) => new Types.ObjectId(author)),
  description: z.string().trim(),
  visibility: z.enum(['public', 'private']),
});

export const boardResponseSchema = z.object({
  id: z.instanceof(Types.ObjectId),
  title: z.string().trim(),
  author: z.instanceof(Types.ObjectId),
  description: z.string().trim(),
  visibility: z.enum(['public', 'private']),
});
