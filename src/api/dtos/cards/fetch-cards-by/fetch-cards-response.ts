import AbstractDTO from '@/api/dtos/abstract.dto';
import { cardResponseSchema } from '../cards-schemas';

const fetchCardsResponseSchema = cardResponseSchema;

class FetchCardsResponseDTO extends AbstractDTO<
  typeof fetchCardsResponseSchema
> {
  protected rules() {
    return fetchCardsResponseSchema;
  }
}

export default FetchCardsResponseDTO;
