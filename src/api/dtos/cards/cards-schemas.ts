import { z } from 'zod';
import { Types, isValidObjectId } from 'mongoose';
import { Colors } from '@/api/models/cards.model';

export const cardRequestSchema = z.object({
  id: z.string().refine((id) => isValidObjectId(id)),
  title: z.string().trim(),
  description: z.string().trim().optional(),
  tags: z
    .object({ name: z.string().trim(), color: z.nativeEnum(Colors) })
    .array()
    .optional(),
  list: z
    .string()
    .refine((list) => isValidObjectId(list))
    .transform((list) => new Types.ObjectId(list)),
  board: z
    .string()
    .refine((board) => isValidObjectId(board))
    .transform((board) => new Types.ObjectId(board)),
});

export const cardResponseSchema = z.object({
  id: z.instanceof(Types.ObjectId),
  title: z.string().trim(),
  description: z.string().trim().optional(),
  tags: z
    .object({ name: z.string().trim(), color: z.nativeEnum(Colors) })
    .array()
    .optional(),
  list: z.instanceof(Types.ObjectId),
  board: z.instanceof(Types.ObjectId),
});
