import { type Request, type Response } from 'express';

import DeleteBoardRequestDTO from '@/api/dtos/boards/delete-board/delete-delete-request.dto';
import CreateBoardResponseDTO from '@/api/dtos/boards/create-board/create-board-response.dto';
import DeleteBoardService from '@/api/services/boards/delete-board.service';
import BoardsRepositoryMongoose from '@/api/repositories/mongoose/boards.repository';

const deleteBoard = async (request: Request, response: Response) => {
  const data = new DeleteBoardRequestDTO({
    id: request.params.boardId,
    ...request.body,
  });

  const deleteBoard = await new DeleteBoardService(
    new BoardsRepositoryMongoose(),
  ).execute(data);

  return response
    .status(200)
    .json(new CreateBoardResponseDTO(deleteBoard).getAll());
};

export default deleteBoard;
