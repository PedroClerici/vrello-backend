import { type Request, type Response } from 'express';

import GetUserByResponseDTO from '@/api/dtos/users/get-user-by/get-user-by-response.dto';
import DeleteUserRequestDTO from '@/api/dtos/users/delete-user/delete-user-request.dto';
import DeleteUserService from '@/api/services/users/delete-user.service';
import UsersRepositoryMongoose from '@/api/repositories/mongoose/users.repository';

const deleteUser = async (request: Request, response: Response) => {
  const data = new DeleteUserRequestDTO({ id: request.params.userId });

  const userDeleted = await new DeleteUserService(
    new UsersRepositoryMongoose(),
  ).execute(data);

  return response
    .status(200)
    .json(new GetUserByResponseDTO(userDeleted).getAll());
};

export default deleteUser;
