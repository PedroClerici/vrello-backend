import AbstractDTO from '@/api/dtos/abstract.dto';
import { listRequestSchema } from '../lists-schemas';

const updateListRequestSchema = listRequestSchema
  .partial()
  .required({ id: true });

class UpdateListRequestDTO extends AbstractDTO<typeof updateListRequestSchema> {
  protected rules() {
    return updateListRequestSchema;
  }
}

export default UpdateListRequestDTO;
