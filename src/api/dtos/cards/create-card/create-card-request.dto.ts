import AbstractDTO from '@/api/dtos/abstract.dto';
import { cardRequestSchema } from '../cards-schemas';

const createCardRequestSchema = cardRequestSchema.omit({ id: true });

class CreateCardRequestDTO extends AbstractDTO<typeof createCardRequestSchema> {
  protected rules() {
    return createCardRequestSchema;
  }
}

export default CreateCardRequestDTO;
