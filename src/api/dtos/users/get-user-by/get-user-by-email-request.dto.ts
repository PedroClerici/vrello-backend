import z from 'zod';

import AbstractDTO from '@/api/dtos/abstract.dto';

const getUserByEmailRequestSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
});

class GetUserByEmailRequestDTO extends AbstractDTO<
  typeof getUserByEmailRequestSchema
> {
  protected rules() {
    return getUserByEmailRequestSchema;
  }
}

export default GetUserByEmailRequestDTO;
