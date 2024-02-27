import { z } from 'zod';

const authRequirements = {
  register: z.object({
    body: z
      .object({
        email: z.string().email().trim(),
        username: z.string().trim(),
        password: z.string().min(5),
      })
      .strict(),
  }),
  login: z.object({
    body: z
      .object({
        email: z.string().email().trim(),
        password: z.string().min(5),
      })
      .strict(),
  }),
};

export default authRequirements;
