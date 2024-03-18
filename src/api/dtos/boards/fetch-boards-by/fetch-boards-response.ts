import AbstractDTO from '@/api/dtos/abstract.dto';
import boardSchema from '../base-board-schema';

const fetchBoardsResponseSchema = boardSchema;

class FetchBoardsResponseDTO extends AbstractDTO<
  typeof fetchBoardsResponseSchema
> {
  protected rules() {
    return fetchBoardsResponseSchema;
  }
}

export default FetchBoardsResponseDTO;
