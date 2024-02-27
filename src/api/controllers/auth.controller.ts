import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { type JwtPayload, TokenExpiredError } from 'jsonwebtoken';

import { env } from '@/config';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/utils/api-errors';
import UserModel from '../models/users.model';
import * as UserService from '../services/users.service';

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, env.saltRounds);

  const user = await UserService.createUser({
    username,
    email,
    password: hashedPassword,
  });

  if (!user) {
    throw new BadRequestError('User already exists');
  }

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

  const token = jwt.sign({}, env.jwtPass, {
    subject: user._id.toString(),
    expiresIn: '5m',
  });

  const refreshToken = jwt.sign({}, env.jwtPass, {
    subject: user._id.toString(),
    expiresIn: '7d',
  });

  return res.cookie('refreshToken', refreshToken).json({ token });
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new UnauthorizedError('Invalid token');
  }

  const { sub } = jwt.verify(
    refreshToken as string,
    env.jwtPass,
    (err, decoded) => {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedError('Token has expired');
      }

      return decoded;
    },
  ) as unknown as JwtPayload;

  const user = await UserModel.findById(sub);
  if (!user) {
    throw new UnauthorizedError('Invalid token');
  }

  const token = jwt.sign({}, env.jwtPass, {
    subject: user._id.toString(),
    expiresIn: '5m',
  });

  const newRefreshToken = jwt.sign({}, env.jwtPass, {
    subject: user._id.toString(),
    expiresIn: '7d',
  });

  return res.cookie('refreshToken', newRefreshToken).json({ token });
};

export const profile = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ email: req.user.email }).then(
    (currentUser) => currentUser?.toObject(),
  );
  if (!user) {
    throw new NotFoundError("Couldn't find user");
  }

  return res.json(user);
};
