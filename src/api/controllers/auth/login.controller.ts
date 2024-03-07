import { type Request, type Response } from 'express';

import LoginRequestDTO from '@/api/dtos/login/login-request.dto';
import LoginService from '@/api/services/auth/login.service';
import MongooseUsersRepository from '@/api/repositories/users.repository';

const login = async (request: Request, response: Response) => {
  const data = new LoginRequestDTO({ ...request.body });

  const [token, refreshToken] = await new LoginService(
    new MongooseUsersRepository(),
  ).execute(data);

  return response
    .status(200)
    .cookie('refreshToken', refreshToken)
    .json({ token });
};

export default login;
