import { type Request, type Response } from 'express';

import GetUserByIdRequestDTO from '@/api/dtos/get-user-by/get-user-by-id-request.dto';
import GetUserByResponseDTO from '@/api/dtos/get-user-by/get-user-by-response.dto';
import GetUserByIdService from '@/api/services/users/get-user-by-id.service';
import UsersRepositoryMongoose from '@/api/repositories/mongoose/users.repository';

const getUser = async (request: Request, response: Response) => {
  const data = new GetUserByIdRequestDTO({ ...request.params });

  const user = await new GetUserByIdService(
    new UsersRepositoryMongoose(),
  ).execute(data);

  return response.status(200).json(new GetUserByResponseDTO(user).getAll());
};

export default getUser;
