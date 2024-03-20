import AbstractDTO from '@/api/dtos/abstract.dto';
import { listRequestSchema } from '../lists-schemas';

const deleteListRequestSchema = listRequestSchema.pick({ id: true });

class DeleteListRequestDTO extends AbstractDTO<typeof deleteListRequestSchema> {
  protected rules() {
    return deleteListRequestSchema;
  }
}

export default DeleteListRequestDTO;
