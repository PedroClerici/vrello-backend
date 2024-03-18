import { z } from 'zod';
import { Types } from 'mongoose';

const boardSchema = z.object({
  id: z.instanceof(Types.ObjectId),
  // id: z.string().refine((id) => isValidObjectId(id)),
  title: z.string().trim(),
  author: z.instanceof(Types.ObjectId),
  description: z.string().trim(),
  visibility: z.enum(['public', 'private']),
});

export default boardSchema;
