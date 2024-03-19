import UpdateBoardRequestDTO from '@/api/dtos/boards/update-board/update-board-request.dto';
import { type BoardsRepository } from '@/api/repositories';
import { BadRequestError } from '@/utils/api-errors';

class UpdateBoardService {
  public constructor(private readonly boardsRepository: BoardsRepository) {}

  public async execute(data: UpdateBoardRequestDTO) {
    const { id, ...boardInput } = data.getAll();

    const boardUpdated = await this.boardsRepository.update(id, boardInput);

    if (!boardUpdated) {
      throw new BadRequestError("Couldn't find board");
    }

    return boardUpdated;
  }
}

export default UpdateBoardService;
