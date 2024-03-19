import AbstractDTO from '@/api/dtos/abstract.dto';
import { boardResponseSchema } from '../boards-schemas';

const createBoardResponseSchema = boardResponseSchema;

class CreateBoardResponseDTO extends AbstractDTO<
  typeof createBoardResponseSchema
> {
  protected rules() {
    return createBoardResponseSchema;
  }
}

export default CreateBoardResponseDTO;
