import AbstractDTO from '@/api/dtos/abstract.dto';
import { listRequestSchema } from '../lists-schemas';

const fetchListsRequestSchema = listRequestSchema.pick({ board: true });

class FetchListsByBoardRequestDTO extends AbstractDTO<
  typeof fetchListsRequestSchema
> {
  protected rules() {
    return fetchListsRequestSchema;
  }
}

export default FetchListsByBoardRequestDTO;
