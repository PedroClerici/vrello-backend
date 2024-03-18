import AbstractDTO from '@/api/dtos/abstract.dto';
import boardSchema from '../base-board-schema';

const createBoardRequestSchema = boardSchema.omit({ id: true });

class CreateBoardRequestDTO extends AbstractDTO<
  typeof createBoardRequestSchema
> {
  protected rules() {
    return createBoardRequestSchema;
  }
}

export default CreateBoardRequestDTO;
