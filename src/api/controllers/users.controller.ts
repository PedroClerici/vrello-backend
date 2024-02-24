import { type Request, type Response } from 'express';

import { NotFoundError } from '@/utils/api-errors';
import UserModel from '../models/users.model';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find();

  return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);
  if (!user) {
    throw new NotFoundError("Couldn't find user");
  }

  return res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, username } = req.body;

  const user = await UserModel.findById(id);
  if (!user) {
    throw new NotFoundError("Couldn't find user");
  }
  user.email = email;
  user.username = username;
  await user.save();

  return res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedUser = await UserModel.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new NotFoundError("Couldn't find user");
  }

  return res.json(deletedUser);
};
