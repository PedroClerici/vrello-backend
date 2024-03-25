import AbstractDTO from '@/api/dtos/abstract.dto';
import { cardResponseSchema } from '../cards-schemas';

const createCardResponseSchema = cardResponseSchema;

class CreateCardResponseDTO extends AbstractDTO<
  typeof createCardResponseSchema
> {
  protected rules() {
    return createCardResponseSchema;
  }
}

export default CreateCardResponseDTO;
