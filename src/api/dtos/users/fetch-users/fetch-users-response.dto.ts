import AbstractDTO from '@/api/dtos/abstract.dto';
import { userResponseSchema } from '../users-schemas';

const fetchUsersResponseSchema = userResponseSchema;

class FetchUsersResponseDTO extends AbstractDTO<
  typeof fetchUsersResponseSchema
> {
  protected rules() {
    return fetchUsersResponseSchema;
  }
}

export default FetchUsersResponseDTO;
