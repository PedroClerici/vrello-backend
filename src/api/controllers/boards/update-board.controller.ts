import { type Request, type Response } from 'express';

import UpdateBoardRequestDTO from '@/api/dtos/boards/update-board/update-board-request.dto';
import UpdateBoardResponseDTO from '@/api/dtos/boards/update-board/update-board-response.dto';
import UpdateBoardService from '@/api/services/boards/update-board.service';
import BoardsRepositoryMongoose from '@/api/repositories/mongoose/boards.repository';

const updateBoard = async (request: Request, response: Response) => {
  const data = new UpdateBoardRequestDTO({
    id: request.params.boardId,
    ...request.body,
  });

  const board = await new UpdateBoardService(
    new BoardsRepositoryMongoose(),
  ).execute(data);

  return response.status(200).json(new UpdateBoardResponseDTO(board).getAll());
};

export default updateBoard;
