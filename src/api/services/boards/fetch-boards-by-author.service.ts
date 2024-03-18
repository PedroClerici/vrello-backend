import { type BoardsRepository } from '@/api/repositories';
import FetchBoardsByAuthorRequestDTO from '@/api/dtos/boards/fetch-boards-by/fetch-boards-by-author-request';

class FetchBoardsByAuthorService {
  public constructor(private readonly boardsRepository: BoardsRepository) {}

  public async execute(data: FetchBoardsByAuthorRequestDTO) {
    const boards = await this.boardsRepository.findByAuthor(
      data.get('authorId'),
    );

    return boards;
  }
}

export default FetchBoardsByAuthorService;
