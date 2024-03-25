import AbstractDTO from '@/api/dtos/abstract.dto';
import { cardRequestSchema } from '../cards-schemas';

const fetchCardsRequestSchema = cardRequestSchema.pick({ list: true });

class FetchCardsByListRequestDTO extends AbstractDTO<
  typeof fetchCardsRequestSchema
> {
  protected rules() {
    return fetchCardsRequestSchema;
  }
}

export default FetchCardsByListRequestDTO;
