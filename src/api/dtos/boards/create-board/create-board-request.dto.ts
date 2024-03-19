import AbstractDTO from '@/api/dtos/abstract.dto';
import { boardRequestSchema } from '../boards-schemas';

const createBoardRequestSchema = boardRequestSchema.omit({ id: true });

class CreateBoardRequestDTO extends AbstractDTO<
  typeof createBoardRequestSchema
> {
  protected rules() {
    return createBoardRequestSchema;
  }
}

export default CreateBoardRequestDTO;
