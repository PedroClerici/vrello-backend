import AbstractDTO from '@/api/dtos/abstract.dto';
import { listResponseSchema } from '../lists-schemas';

const fetchListsResponseSchema = listResponseSchema;

class FetchListsResponseDTO extends AbstractDTO<
  typeof fetchListsResponseSchema
> {
  protected rules() {
    return fetchListsResponseSchema;
  }
}

export default FetchListsResponseDTO;
