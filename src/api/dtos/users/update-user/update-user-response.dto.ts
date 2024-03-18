import z from 'zod';
import { Types } from 'mongoose';

import AbstractDTO from '@/api/dtos/abstract.dto';

const updateUserResponseSchema = z.object({
  id: z.instanceof(Types.ObjectId),
  username: z.string().trim(),
  email: z.string().email().trim().toLowerCase(),
});

class UpdateUserResponseDTO extends AbstractDTO<
  typeof updateUserResponseSchema
> {
  protected rules() {
    return updateUserResponseSchema;
  }
}

export default UpdateUserResponseDTO;
