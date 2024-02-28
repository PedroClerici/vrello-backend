import { type Request, type Response } from 'express';

import { UnauthorizedError } from '@/utils/api-errors';
import UsersService from '../services/users.service';
import AuthService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  const userInput = req.body;

  const user = await AuthService.register(userInput);

  return res.status(200).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [token, refreshToken] = await AuthService.login(email, password);

  return res.cookie('refreshToken', refreshToken).json({ token });
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new UnauthorizedError('Invalid token');
  }

  const [token, newRefreshToken] = await AuthService.refresh(refreshToken);

  return res.cookie('refreshToken', newRefreshToken).json({ token });
};

export const profile = async (req: Request, res: Response) => {
  const user = await UsersService.getUserByEmail(req.user.email!);

  return res.status(200).json(user);
};
