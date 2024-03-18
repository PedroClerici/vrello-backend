import AbstractDTO from '@/api/dtos/abstract.dto';
import boardSchema from '../base-board-schema';

const createBoardResponseSchema = boardSchema;

class CreateBoardRequestDTO extends AbstractDTO<
  typeof createBoardResponseSchema
> {
  protected rules() {
    return createBoardResponseSchema;
  }
}

export default CreateBoardRequestDTO;
