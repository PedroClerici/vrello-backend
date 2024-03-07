import { type Request, type Response } from 'express';

import UpdateUserRequestDTO from '@/api/dtos/update-user/update-user-request.dto';
import UpdateUserResponseDTO from '@/api/dtos/update-user/update-user-response.dto';
import UpdateUserService from '@/api/services/users/update-user.service';
import MongooseUsersRepository from '@/api/repositories/users.repository';

const updateUser = async (request: Request, response: Response) => {
  const data = new UpdateUserRequestDTO({ ...request.params, ...request.body });

  const userUpdated = await new UpdateUserService(
    new MongooseUsersRepository(),
  ).execute(data);

  return response
    .status(200)
    .json(new UpdateUserResponseDTO(userUpdated).getAll());
};

export default updateUser;
