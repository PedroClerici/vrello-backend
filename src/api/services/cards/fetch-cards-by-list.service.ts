import { type CardsRepository } from '@/api/repositories/index';
import FetchCardsByListRequestDTO from '@/api/dtos/cards/fetch-cards-by/fetch-cards-by-list-request';

class FetchCardsByListService {
  public constructor(private readonly cardsRepository: CardsRepository) {}

  public async execute(data: FetchCardsByListRequestDTO) {
    const cards = await this.cardsRepository.findByList(
      data.get('list').toString(),
    );

    return cards;
  }
}

export default FetchCardsByListService;
