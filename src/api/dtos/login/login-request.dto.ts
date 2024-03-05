import z from 'zod';

import AbstractDTO from '../abstract.dto';

const loginRequestSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string(),
});

class LoginRequestDTO extends AbstractDTO<typeof loginRequestSchema> {
  protected rules() {
    return loginRequestSchema;
  }
}

export default LoginRequestDTO;
