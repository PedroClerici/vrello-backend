import z from 'zod';

import AbstractDTO from '../abstract.dto';

const registerRequestSchema = z.object({
  username: z.string().trim().toLowerCase(),
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(5),
});

class RegisterRequestDTO extends AbstractDTO<typeof registerRequestSchema> {
  protected rules() {
    return registerRequestSchema;
  }
}

export default RegisterRequestDTO;
