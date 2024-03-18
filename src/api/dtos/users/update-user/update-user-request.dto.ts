import z from 'zod';
import { isValidObjectId } from 'mongoose';

import AbstractDTO from '@/api/dtos/abstract.dto';

const updateUserRequestSchema = z
  .object({
    id: z.string().refine((id) => isValidObjectId(id)),
    username: z.string().trim(),
    email: z.string().email().trim().toLowerCase(),
    // password: z.string().min(5),
  })
  .partial()
  .required({ id: true })
  .refine(
    ({ email, username }) => username !== undefined || email !== undefined,
  );

class UpdateUserRequestDTO extends AbstractDTO<typeof updateUserRequestSchema> {
  protected rules() {
    return updateUserRequestSchema;
  }
}

export default UpdateUserRequestDTO;
