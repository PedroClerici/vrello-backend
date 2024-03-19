import { BoardsRepository } from '@/api/repositories';
import type DeleteBoardRequestDTO from '@/api/dtos/boards/delete-board/delete-delete-request.dto';
import { BadRequestError } from '@/utils/api-errors';

class DeleteBoardService {
  public constructor(private readonly boardsRepository: BoardsRepository) {}

  public async execute(data: DeleteBoardRequestDTO) {
    const boardDeleted = await this.boardsRepository.delete(data.get('id'));

    if (!boardDeleted) {
      throw new BadRequestError("Couldn't find board");
    }

    return boardDeleted;
  }
}

export default DeleteBoardService;
