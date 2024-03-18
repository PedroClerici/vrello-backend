import z from 'zod';
import { Types } from 'mongoose';

import AbstractDTO from '@/api/dtos/abstract.dto';

const registerResponseSchema = z.object({
  id: z.instanceof(Types.ObjectId),
  username: z.string().trim(),
  email: z.string().email().trim().toLowerCase(),
});

class RegisterResponseDTO extends AbstractDTO<typeof registerResponseSchema> {
  protected rules() {
    return registerResponseSchema;
  }
}

export default RegisterResponseDTO;
