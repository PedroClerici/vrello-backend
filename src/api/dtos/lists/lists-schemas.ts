import { z } from 'zod';
import { Types, isValidObjectId } from 'mongoose';

export const listRequestSchema = z.object({
  id: z.string().refine((id) => isValidObjectId(id)),
  title: z.string().trim(),
  board: z
    .string()
    .refine((board) => isValidObjectId(board))
    .transform((board) => new Types.ObjectId(board)),
});

export const listResponseSchema = z.object({
  id: z.instanceof(Types.ObjectId),
  title: z.string().trim(),
  board: z.instanceof(Types.ObjectId),
});
