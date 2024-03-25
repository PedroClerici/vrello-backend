import { type Request, type Response } from 'express';

import UpdateListRequestDTO from '@/api/dtos/lists/update-list/update-list-request.dto';
import UpdateListResponseDTO from '@/api/dtos/lists/update-list/update-list-response.dto';
import UpdateListService from '@/api/services/lists/update-list.service';
import ListsRepositoryMongoose from '@/api/repositories/mongoose/lists.repository';

const updateList = async (request: Request, response: Response) => {
  const data = new UpdateListRequestDTO({
    id: request.params.listId,
    ...request.body,
  });

  const list = await new UpdateListService(
    new ListsRepositoryMongoose(),
  ).execute(data);

  return response.status(200).json(new UpdateListResponseDTO(list).getAll());
};

export default updateList;
