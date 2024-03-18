import z from 'zod';

import AbstractDTO from '@/api/dtos/abstract.dto';

const refreshRequestSchema = z.object({
  refreshToken: z.string(),
});

class RefreshRequestDTO extends AbstractDTO<typeof refreshRequestSchema> {
  protected rules() {
    return refreshRequestSchema;
  }
}

export default RefreshRequestDTO;
