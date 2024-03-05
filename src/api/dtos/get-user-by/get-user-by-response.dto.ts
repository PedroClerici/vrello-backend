import z from 'zod';

import AbstractDTO from '../abstract.dto';

const getUserByResponseSchema = z.object({
  id: z.string(),
  username: z.string().trim(),
  email: z.string().email().trim().toLowerCase(),
});

class GetUserByResponseDTO extends AbstractDTO<typeof getUserByResponseSchema> {
  protected rules() {
    return getUserByResponseSchema;
  }
}

export default GetUserByResponseDTO;
