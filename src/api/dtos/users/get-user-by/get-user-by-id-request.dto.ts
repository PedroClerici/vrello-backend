import z from 'zod';
import { isValidObjectId } from 'mongoose';

import AbstractDTO from '@/api/dtos/abstract.dto';

const getUserByIdRequestSchema = z.object({
  id: z.string().refine((id) => isValidObjectId(id)),
});

class GetUserByIdRequestDTO extends AbstractDTO<
  typeof getUserByIdRequestSchema
> {
  protected rules() {
    return getUserByIdRequestSchema;
  }
}

export default GetUserByIdRequestDTO;
