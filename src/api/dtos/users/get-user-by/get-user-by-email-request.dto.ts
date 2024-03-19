import AbstractDTO from '@/api/dtos/abstract.dto';
import { userRequestSchema } from '../users-schemas';

const getUserByEmailRequestSchema = userRequestSchema.pick({ email: true });

class GetUserByEmailRequestDTO extends AbstractDTO<
  typeof getUserByEmailRequestSchema
> {
  protected rules() {
    return getUserByEmailRequestSchema;
  }
}

export default GetUserByEmailRequestDTO;
