import { type Request, type Response } from 'express';

import GetUserByEmailRequestDTO from '@/api/dtos/get-user-by/get-user-by-email-request.dto';
import GetUserByResponseDTO from '@/api/dtos/get-user-by/get-user-by-response.dto';
import GetUserByEmailService from '@/api/services/users/get-user-by-email.service';
import UsersRepositoryMongoose from '@/api/repositories/mongoose/users.repository';

const profile = async (request: Request, response: Response) => {
  const data = new GetUserByEmailRequestDTO({ email: request.user.email });

  const user = await new GetUserByEmailService(
    new UsersRepositoryMongoose(),
  ).execute(data);

  return response.status(200).json(new GetUserByResponseDTO(user).getAll());
};

export default profile;
