import z from 'zod';

import AbstractDTO from '../abstract.dto';

const createUserSchema = z.object({
  username: z.string().trim().toLowerCase(),
  email: z.string().email().trim().toLowerCase(),
});

class CreateUserResponseDTO extends AbstractDTO<typeof createUserSchema> {
  protected rules() {
    return createUserSchema;
  }
}

export default CreateUserResponseDTO;
