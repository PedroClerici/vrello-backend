import { type Request, type Response } from 'express';

import FetchListsByBoardRequestDTO from '@/api/dtos/lists/fetch-lists-by/fetch-lists-by-board-request';
import FetchListsResponseDTO from '@/api/dtos/lists/fetch-lists-by/fetch-lists-response';
import FetchListsByBoardService from '@/api/services/lists/fetch-lists-by-board.service';
import ListsRepositoryMongoose from '@/api/repositories/mongoose/lists.repository';

const fetchListsByBoard = async (request: Request, response: Response) => {
  const data = new FetchListsByBoardRequestDTO({
    board: request.params.boardId,
  });

  const lists = await new FetchListsByBoardService(
    new ListsRepositoryMongoose(),
  ).execute(data);

  return response
    .status(200)
    .json(lists.map((lists) => new FetchListsResponseDTO(lists).getAll()));
};

export default fetchListsByBoard;
