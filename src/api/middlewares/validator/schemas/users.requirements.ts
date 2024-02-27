import { z } from 'zod';

const userRequirements = {
  getUser: z.object({
    params: z.object({
      id: z.string(),
    }),
  }),
  updateUser: z.object({
    params: z.object({
      id: z.string(),
    }),
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
      id: z.string(),
    }),
  }),
};

export default userRequirements;
