import AbstractDTO from '@/api/dtos/abstract.dto';
import { boardResponseSchema } from '../boards-schemas';

const updateBoardResponseSchema = boardResponseSchema;

class UpdateBoardResponseDTO extends AbstractDTO<
  typeof updateBoardResponseSchema
> {
  protected rules() {
    return updateBoardResponseSchema;
  }
}

export default UpdateBoardResponseDTO;
