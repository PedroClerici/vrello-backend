import z from 'zod';
import { Types } from 'mongoose';

import AbstractDTO from '@/api/dtos/abstract.dto';

const getUserByResponseSchema = z.object({
  id: z.instanceof(Types.ObjectId),
  username: z.string().trim(),
  email: z.string().email().trim().toLowerCase(),
});

class GetUserByResponseDTO extends AbstractDTO<typeof getUserByResponseSchema> {
  protected rules() {
    return getUserByResponseSchema;
  }
}

export default GetUserByResponseDTO;
