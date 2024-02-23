import { type Request, type Response, type NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

import { env } from '@/config';
import UserModel from '../models/users.model';

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Not authorized');
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, env.jwtPass) as JwtPayload;

    const user = await UserModel.findById(id).then((tokenUser) =>
      tokenUser?.toObject(),
    );
    if (!user) {
      throw new Error('Not authorized');
    }

    delete user.password;

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: 'Not authorized',
    });
  }
};

export default isAuthenticated;
