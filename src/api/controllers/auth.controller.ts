import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { logger, env } from '@/config';
import { BadRequestError, NotFoundError } from '@/utils/api-errors';
import UserModel from '../models/users.model';

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, env.saltRounds);

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('User already exists');
  }

  const user = await new UserModel({
    username,
    email,
    password: hashedPassword,
  })
    .save()
    .then((newUser) => newUser.toObject());

  // deletes user password from the payload:
  delete user.password;

  return res.status(200).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email })
    .populate('password')
    .then((loginUser) => loginUser?.toObject());
  if (!user) {
    throw new BadRequestError('Email or password are invalid');
  }

  const verifyPassword = await bcrypt.compare(password, user.password!);
  if (!verifyPassword) {
    throw new BadRequestError('Email or password are invalid');
  }

  const token = jwt.sign({ id: user._id }, env.jwtPass, { expiresIn: '5m' });

  return res.json({ token });
};

export const profile = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ email: req.user.email }).then(
    (currentUser) => currentUser?.toObject(),
  );
  if (!user) {
    throw new NotFoundError("Couldn't find user");
  }

  logger.info(user);
  return res.json(user);
};
