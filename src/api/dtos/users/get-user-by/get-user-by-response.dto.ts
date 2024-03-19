import AbstractDTO from '@/api/dtos/abstract.dto';
import { userResponseSchema } from '../users-schemas';

const getUserByResponseSchema = userResponseSchema;

class GetUserByResponseDTO extends AbstractDTO<typeof getUserByResponseSchema> {
  protected rules() {
    return getUserByResponseSchema;
  }
}

export default GetUserByResponseDTO;
