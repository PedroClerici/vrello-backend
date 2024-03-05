import { type Request, type Response } from 'express';

import RegisterService from '../services/auth/register.service';
import { MongooseUsersRepository } from '../repositories/users.repository';
import RegisterRequestDTO from '../dtos/register/register-request.dto';
import RegisterResponseDTO from '../dtos/register/register-response.dto';
import LoginRequestDTO from '../dtos/login/login-request.dto';
import LoginService from '../services/auth/login.service';
import RefreshService from '../services/auth/refresh.service';
import RefreshRequestDTO from '../dtos/refresh/refresh-request.dto';
import GetUserByEmailService from '../services/users/get-user-by-email.service';
import GetUserByEmailRequestDTO from '../dtos/get-user-by/get-user-by-email-request.dto';
import GetUserByResponseDTO from '../dtos/get-user-by/get-user-by-response.dto';

export const register = async (req: Request, res: Response) => {
  const data = new RegisterRequestDTO({ ...req.body });

  const user = await new RegisterService(new MongooseUsersRepository()).execute(
    data,
  );

  return res.status(201).json(new RegisterResponseDTO(user).getAll());
};

export const login = async (req: Request, res: Response) => {
  const data = new LoginRequestDTO({ ...req.body });

  const [token, refreshToken] = await new LoginService(
    new MongooseUsersRepository(),
  ).execute(data);

  return res.status(200).cookie('refreshToken', refreshToken).json({ token });
};

export const refresh = async (req: Request, res: Response) => {
  const data = new RefreshRequestDTO({ ...req.cookies });

  const [token, newRefreshToken] = await new RefreshService(
    new MongooseUsersRepository(),
  ).execute(data);

  return res
    .status(200)
    .cookie('refreshToken', newRefreshToken)
    .json({ token });
};

export const profile = async (req: Request, res: Response) => {
  const data = new GetUserByEmailRequestDTO({ email: req.user.email });

  const user = await new GetUserByEmailService(
    new MongooseUsersRepository(),
  ).execute(data);

  return res.status(200).json(new GetUserByResponseDTO(user).getAll());
};
