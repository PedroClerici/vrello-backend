import { type ListsRepository } from '@/api/repositories/index';
import FetchListsByBoardRequestDTO from '@/api/dtos/lists/fetch-lists-by/fetch-lists-by-board-request';

class FetchListsByBoardService {
  public constructor(private readonly listsRepository: ListsRepository) {}

  public async execute(data: FetchListsByBoardRequestDTO) {
    const lists = await this.listsRepository.findByBoard(
      data.get('board').toString(),
    );

    return lists;
  }
}

export default FetchListsByBoardService;
