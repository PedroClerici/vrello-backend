import AbstractDTO from '@/api/dtos/abstract.dto';
import { listResponseSchema } from '../lists-schemas';

const createListResponseSchema = listResponseSchema;

class CreateListResponseDTO extends AbstractDTO<
  typeof createListResponseSchema
> {
  protected rules() {
    return createListResponseSchema;
  }
}

export default CreateListResponseDTO;
