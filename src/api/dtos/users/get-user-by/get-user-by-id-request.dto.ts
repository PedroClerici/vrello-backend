import AbstractDTO from '@/api/dtos/abstract.dto';
import { userRequestSchema } from '../users-schemas';

const getUserByIdRequestSchema = userRequestSchema.pick({ id: true });

class GetUserByIdRequestDTO extends AbstractDTO<
  typeof getUserByIdRequestSchema
> {
  protected rules() {
    return getUserByIdRequestSchema;
  }
}

export default GetUserByIdRequestDTO;
