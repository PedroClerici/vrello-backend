import { type CardsRepository } from '@/api/repositories/index';
import DeleteCardRequestDTO from '@/api/dtos/cards/delete-card/delete-card-request.dto';
import { BadRequestError } from '@/utils/api-errors';

class DeleteCardService {
  public constructor(private readonly cardsRepository: CardsRepository) {}

  public async execute(data: DeleteCardRequestDTO) {
    const card = await this.cardsRepository.delete(data.get('id'));

    if (!card) {
      throw new BadRequestError("Couldn't find card");
    }

    return card;
  }
}

export default DeleteCardService;
