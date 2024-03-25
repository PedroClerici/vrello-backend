import { type Request, type Response } from 'express';

import DeleteListRequestDTO from '@/api/dtos/lists/delete-list/delete-list-request.dto';
import CreateListResponseDTO from '@/api/dtos/lists/create-list/create-list-response.dto';
import DeleteListService from '@/api/services/lists/delete-list.service';
import ListsRepositoryMongoose from '@/api/repositories/mongoose/lists.repository';

const deleteList = async (request: Request, response: Response) => {
  const data = new DeleteListRequestDTO({
    id: request.params.listId,
    ...request.body,
  });

  const listDeleted = await new DeleteListService(
    new ListsRepositoryMongoose(),
  ).execute(data);

  return response
    .status(200)
    .json(new CreateListResponseDTO(listDeleted).getAll());
};

export default deleteList;
