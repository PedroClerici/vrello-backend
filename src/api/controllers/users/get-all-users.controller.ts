import { type Request, type Response } from 'express';

import FetchUsersResponseDTO from '@/api/dtos/fetch-users/fetch-users-response.dto';
import FetchUsersService from '@/api/services/users/fetch-users.service';
import UsersRepositoryMongoose from '@/api/repositories/mongoose/users.repository';

const getAllUsers = async (request: Request, response: Response) => {
  const users = await new FetchUsersService(
    new UsersRepositoryMongoose(),
  ).execute();

  return response.json(
    users.map((user) => new FetchUsersResponseDTO(user).getAll()),
  );
};

export default getAllUsers;
