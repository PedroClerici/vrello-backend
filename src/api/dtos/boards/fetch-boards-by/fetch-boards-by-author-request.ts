import AbstractDTO from '@/api/dtos/abstract.dto';
import { boardRequestSchema } from '../boards-schemas';

const fetchBoardsRequestSchema = boardRequestSchema.pick({ author: true });

class FetchBoardsByAuthorRequestDTO extends AbstractDTO<
  typeof fetchBoardsRequestSchema
> {
  protected rules() {
    return fetchBoardsRequestSchema;
  }
}

export default FetchBoardsByAuthorRequestDTO;
