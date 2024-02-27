import { z } from 'zod';
import { Types } from 'mongoose';

const userRequirements = {
  getUser: z.object({
    params: z.object({
      id: z.instanceof(Types.ObjectId),
    }),
  }),
  updateUser: z.object({
    body: z
      .object({
        email: z.string().email().trim().optional(),
        username: z.string().trim().optional(),
        password: z.string().min(5).optional(),
      })
      .strict(),
  }),
  deleteUser: z.object({
    params: z.object({
      id: z.instanceof(Types.ObjectId),
    }),
  }),
};

export default userRequirements;
