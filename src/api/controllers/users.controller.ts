import { type Request, type Response } from 'express';

import { NotFoundError } from '@/utils/api-errors';
import * as UserService from '../services/users.service';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();

  return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserService.getUserById(id);

  if (!user) {
    throw new NotFoundError("Couldn't find user");
  }

  return res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userInput = req.body;

  const userUpdated = await UserService.updateUser(id, userInput);

  if (!userUpdated) {
    throw new NotFoundError("Couldn't find user");
  }

  return res.json(userUpdated);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userDeleted = await UserService.deleteUser(id);

  if (!userDeleted) {
    throw new NotFoundError("Couldn't find user");
  }

  return res.json(userDeleted);
};
