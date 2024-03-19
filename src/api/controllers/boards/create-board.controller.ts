import { type Request, type Response } from 'express';

import CreateBoardRequestDTO from '@/api/dtos/boards/create-board/create-board-request.dto';
import CreateBoardResponseDTO from '@/api/dtos/boards/create-board/create-board-response.dto';
import CreateBoardService from '@/api/services/boards/create-board.service';
import BoardsRepositoryMongoose from '@/api/repositories/mongoose/boards.repository';

const createBoard = async (request: Request, response: Response) => {
  const data = new CreateBoardRequestDTO({
    ...request.body,
    author: request.params.userId,
  });

  const board = await new CreateBoardService(
    new BoardsRepositoryMongoose(),
  ).execute(data);

  return response.status(200).json(new CreateBoardResponseDTO(board).getAll());
};

export default createBoard;
