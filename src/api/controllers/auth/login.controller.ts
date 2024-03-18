import { type Request, type Response } from 'express';

import LoginRequestDTO from '@/api/dtos/auth/login/login-request.dto';
import LoginService from '@/api/services/auth/login.service';
import UsersRepositoryMongoose from '@/api/repositories/mongoose/users.repository';

const login = async (request: Request, response: Response) => {
  const data = new LoginRequestDTO({ ...request.body });

  const [token, refreshToken] = await new LoginService(
    new UsersRepositoryMongoose(),
  ).execute(data);

  return response
    .status(200)
    .cookie('refreshToken', refreshToken)
    .json({ token });
};

export default login;
