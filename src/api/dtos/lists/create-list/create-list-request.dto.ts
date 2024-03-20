import AbstractDTO from '@/api/dtos/abstract.dto';
import { listRequestSchema } from '../lists-schemas';

const createListRequestSchema = listRequestSchema.omit({ id: true });

class CreateListRequestDTO extends AbstractDTO<typeof createListRequestSchema> {
  protected rules() {
    return createListRequestSchema;
  }
}

export default CreateListRequestDTO;
