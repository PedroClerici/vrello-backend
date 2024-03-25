import AbstractDTO from '@/api/dtos/abstract.dto';
import { cardRequestSchema } from '../cards-schemas';

const deleteCardRequestSchema = cardRequestSchema.pick({ id: true });

class DeleteCardRequestDTO extends AbstractDTO<typeof deleteCardRequestSchema> {
  protected rules() {
    return deleteCardRequestSchema;
  }
}

export default DeleteCardRequestDTO;
