import AbstractDTO from '@/api/dtos/abstract.dto';
import { listResponseSchema } from '../lists-schemas';

const updateListResponseSchema = listResponseSchema;

class UpdateBoardResponseDTO extends AbstractDTO<
  typeof updateListResponseSchema
> {
  protected rules() {
    return updateListResponseSchema;
  }
}

export default UpdateBoardResponseDTO;
