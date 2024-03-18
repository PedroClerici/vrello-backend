import { type BoardsRepository } from '@/api/repositories';
import CreateBoardRequestDTO from '@/api/dtos/boards/create-board/create-board-request.dto';

class CreateBoardService {
  public constructor(private readonly boardsRepository: BoardsRepository) {}

  public async execute(data: CreateBoardRequestDTO) {
    const board = await this.boardsRepository.create(data.getAll());

    if (!board) {
      throw new Error("Couldn't create user");
    }

    return board;
  }
}

export default CreateBoardService;
