import AbstractDTO from '@/api/dtos/abstract.dto';
import { boardResponseSchema } from '../boards-schemas';

const fetchBoardsResponseSchema = boardResponseSchema;

class FetchBoardsResponseDTO extends AbstractDTO<
  typeof fetchBoardsResponseSchema
> {
  protected rules() {
    return fetchBoardsResponseSchema;
  }
}

export default FetchBoardsResponseDTO;
