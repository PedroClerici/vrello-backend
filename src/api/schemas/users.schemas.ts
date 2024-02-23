import { z } from 'zod';
import mongoose from 'mongoose';

// eslint-disable-next-line import/prefer-default-export
export const getUserSchema = z.object({
  params: z.object({
    id: z.instanceof(mongoose.Types.ObjectId),
  }),
});
