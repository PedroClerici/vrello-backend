import z from 'zod';

import AbstractDTO from '@/api/dtos/abstract.dto';

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
