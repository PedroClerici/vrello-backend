import AbstractDTO from '@/api/dtos/abstract.dto';
import { userRequestSchema } from '../users-schemas';

const deleteUserRequestSchema = userRequestSchema.pick({ id: true });

class DeleteUserRequestDTO extends AbstractDTO<typeof deleteUserRequestSchema> {
  protected rules() {
    return deleteUserRequestSchema;
  }
}

export default DeleteUserRequestDTO;
