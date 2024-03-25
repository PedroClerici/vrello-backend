import AbstractDTO from '@/api/dtos/abstract.dto';
import { cardResponseSchema } from '../cards-schemas';

const updateCardResponseSchema = cardResponseSchema;

class UpdateCardResponseDTO extends AbstractDTO<
  typeof updateCardResponseSchema
> {
  protected rules() {
    return updateCardResponseSchema;
  }
}

export default UpdateCardResponseDTO;
