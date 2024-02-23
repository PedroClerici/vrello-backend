import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { logger, env } from '@/config';
import UserModel from '../models/users.model';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, env.saltRounds);

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
  } catch (err) {
    logger.error(err, 'Error while registering an user!');
    return res.sendStatus(400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email })
      .populate('password')
      .then((loginUser) => loginUser?.toObject());
    if (!user) {
      return res.status(400).json({
        error: "couldn't login",
        detail: 'Email or password are invalid',
      });
    }

    const verifyPassword = await bcrypt.compare(password, user.password!);
    if (!verifyPassword) {
      return res.status(400).json({
        error: "couldn't login",
        detail: 'Email or password are invalid',
      });
    }

    const token = jwt.sign({ id: user._id }, env.jwtPass, { expiresIn: '5m' });

    return res.status(200).json({ token });
  } catch (err) {
    logger.error(err, 'Error while login an user!');
    return res.sendStatus(400);
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email }).then(
      (currentUser) => currentUser?.toObject(),
    );
    if (!user) {
      throw new Error('User not found!');
    }

    logger.info(user);
    return res.status(200).json(user);
  } catch (err) {
    logger.error(err, 'Error while getting user profile!');
    return res.sendStatus(500);
  }
};
