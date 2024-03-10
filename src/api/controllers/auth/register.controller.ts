import { type Request, type Response } from 'express';

import RegisterRequestDTO from '@/api/dtos/register/register-request.dto';
import RegisterResponseDTO from '@/api/dtos/register/register-response.dto';
import RegisterService from '@/api/services/auth/register.service';
import UsersRepositoryMongoose from '@/api/repositories/mongoose/users.repository';

const register = async (request: Request, response: Response) => {
  const data = new RegisterRequestDTO({ ...request.body });

  const user = await new RegisterService(new UsersRepositoryMongoose()).execute(
    data,
  );

  return response.status(201).json(new RegisterResponseDTO(user).getAll());
};

export default register;
