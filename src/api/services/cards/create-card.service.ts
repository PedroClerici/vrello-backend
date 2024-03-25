import { type CardsRepository } from '@/api/repositories/index';
import CreateCardRequestDTO from '@/api/dtos/cards/create-card/create-card-request.dto';

class CreateCardService {
  public constructor(private readonly cardsRepository: CardsRepository) {}

  public async execute(data: CreateCardRequestDTO) {
    const card = await this.cardsRepository.create(data.getAll());

    if (!card) {
      throw new Error("Couldn't create card");
    }

    return card;
  }
}

export default CreateCardService;
