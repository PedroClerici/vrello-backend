import AbstractDTO from '@/api/dtos/abstract.dto';
import { userResponseSchema } from '../users-schemas';

const updateUserResponseSchema = userResponseSchema;

class UpdateUserResponseDTO extends AbstractDTO<
  typeof updateUserResponseSchema
> {
  protected rules() {
    return updateUserResponseSchema;
  }
}

export default UpdateUserResponseDTO;
