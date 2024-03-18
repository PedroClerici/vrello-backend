import { type Request, type Response } from 'express';

import UpdateUserRequestDTO from '@/api/dtos/users/update-user/update-user-request.dto';
import UpdateUserResponseDTO from '@/api/dtos/users/update-user/update-user-response.dto';
import UpdateUserService from '@/api/services/users/update-user.service';
import UsersRepositoryMongoose from '@/api/repositories/mongoose/users.repository';

const updateUser = async (request: Request, response: Response) => {
  const data = new UpdateUserRequestDTO({
    id: request.params.userId,
    ...request.body,
  });

  const userUpdated = await new UpdateUserService(
    new UsersRepositoryMongoose(),
  ).execute(data);

  return response
    .status(200)
    .json(new UpdateUserResponseDTO(userUpdated).getAll());
};

export default updateUser;
