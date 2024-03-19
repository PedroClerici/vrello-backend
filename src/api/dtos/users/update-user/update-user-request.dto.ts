import AbstractDTO from '@/api/dtos/abstract.dto';
import { userRequestSchema } from '../users-schemas';

const updateUserRequestSchema = userRequestSchema
  .omit({ password: true })
  .partial()
  .required({ id: true })
  .refine(
    ({ email, username }) => username !== undefined || email !== undefined,
  );

class UpdateUserRequestDTO extends AbstractDTO<typeof updateUserRequestSchema> {
  protected rules() {
    return updateUserRequestSchema;
  }
}

export default UpdateUserRequestDTO;
