import AbstractDTO from '@/api/dtos/abstract.dto';
import { cardRequestSchema } from '../cards-schemas';

const updateCardRequestSchema = cardRequestSchema
  .partial()
  .required({ id: true });

class UpdateCardRequestDTO extends AbstractDTO<typeof updateCardRequestSchema> {
  protected rules() {
    return updateCardRequestSchema;
  }
}

export default UpdateCardRequestDTO;
