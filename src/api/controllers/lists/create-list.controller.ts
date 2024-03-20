import { type Request, type Response } from 'express';

import CreateListRequestDTO from '@/api/dtos/lists/create-list/create-list-request.dto';
import CreateListResponseDTO from '@/api/dtos/lists/create-list/create-list-response.dto';
import CreateListService from '@/api/services/lists/create-list.service';
import ListsRepositoryMongoose from '@/api/repositories/mongoose/lists.repository';

const createList = async (request: Request, response: Response) => {
  const data = new CreateListRequestDTO({
    ...request.body,
    board: request.params.boardId,
  });

  const list = await new CreateListService(
    new ListsRepositoryMongoose(),
  ).execute(data);

  return response.status(200).json(new CreateListResponseDTO(list).getAll());
};

export default createList;
