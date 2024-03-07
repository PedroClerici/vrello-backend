import { type Request, type Response } from 'express';

import GetUserByResponseDTO from '@/api/dtos/get-user-by/get-user-by-response.dto';
import DeleteUserRequestDTO from '@/api/dtos/delete-user/delete-user-request.dto';
import DeleteUserService from '@/api/services/users/delete-user.service';
import MongooseUsersRepository from '@/api/repositories/users.repository';

const deleteUser = async (request: Request, response: Response) => {
  const data = new DeleteUserRequestDTO({ ...request.params });

  const userDeleted = await new DeleteUserService(
    new MongooseUsersRepository(),
  ).execute(data);

  return response
    .status(200)
    .json(new GetUserByResponseDTO(userDeleted).getAll());
};

export default deleteUser;
