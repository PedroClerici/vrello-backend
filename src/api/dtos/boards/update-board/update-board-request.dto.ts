import AbstractDTO from '@/api/dtos/abstract.dto';
import { boardRequestSchema } from '../boards-schemas';

const updateBoardRequestSchema = boardRequestSchema
  .partial()
  .required({ id: true });

class UpdateBoardRequestDTO extends AbstractDTO<
  typeof updateBoardRequestSchema
> {
  protected rules() {
    return updateBoardRequestSchema;
  }
}

export default UpdateBoardRequestDTO;
