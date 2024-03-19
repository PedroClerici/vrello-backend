import AbstractDTO from '@/api/dtos/abstract.dto';
import { boardRequestSchema } from '../boards-schemas';

const deleteBoardRequestSchema = boardRequestSchema.pick({ id: true });

class DeleteBoardRequestDTO extends AbstractDTO<
  typeof deleteBoardRequestSchema
> {
  protected rules() {
    return deleteBoardRequestSchema;
  }
}

export default DeleteBoardRequestDTO;
