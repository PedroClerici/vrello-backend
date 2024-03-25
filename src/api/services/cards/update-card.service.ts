import { type CardsRepository } from '@/api/repositories/index';
import UpdateCardRequestDTO from '@/api/dtos/cards/update-card/update-card-request.dto';
import { BadRequestError } from '@/utils/api-errors';

class UpdateCardService {
  public constructor(private readonly cardsRepository: CardsRepository) {}

  public async execute(data: UpdateCardRequestDTO) {
    const { id, ...cardInput } = data.getAll();

    const cardUpdated = await this.cardsRepository.update(id, cardInput);

    if (!cardUpdated) {
      throw new BadRequestError("Couldn't find card");
    }

    return cardUpdated;
  }
}

export default UpdateCardService;
