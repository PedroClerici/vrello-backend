import { type Request, type Response } from 'express';

import { logger } from '@/config';
import UserModel from '../models/users.model';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username } = req.body;

    const user = await new UserModel({ email, username })
      .save()
      .then((newUser) => newUser.toObject());

    return res.status(200).json(user);
  } catch (err) {
    logger.error(err, 'Error while creating an user!');
    return res.sendStatus(400);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json(users);
  } catch (err) {
    logger.error(err, 'Error while fetching users!');
    return res.sendStatus(400);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        detail: 'Ensure that the user id is a valid one',
      });
    }

    return res.status(200).json(user);
  } catch (err) {
    logger.error(err, 'Error while fetching for specific user!');
    return res.sendStatus(400);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, username } = req.body;

    const user = await UserModel.findByIdAndUpdate(id, { email, username });
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        detail: 'Ensure that the user id is a valid one',
      });
    }
    await user.save();

    return res.status(200).json(user);
  } catch (err) {
    logger.error(err, 'Error while updating user!');
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        error: 'User not found',
        detail: 'Ensure that the user id is a valid one',
      });
    }

    return res.status(200).json(deletedUser);
  } catch (err) {
    logger.error(err, 'Error while deleting user!');
    return res.sendStatus(400);
  }
};
