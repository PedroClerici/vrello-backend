import z from 'zod';
import { Types } from 'mongoose';

import AbstractDTO from '@/api/dtos/abstract.dto';

const fetchUsersResponseSchema = z.object({
  id: z.instanceof(Types.ObjectId),
  username: z.string().trim(),
  email: z.string().email().trim().toLowerCase(),
});

class FetchUsersResponseDTO extends AbstractDTO<
  typeof fetchUsersResponseSchema
> {
  protected rules() {
    return fetchUsersResponseSchema;
  }
}

export default FetchUsersResponseDTO;
