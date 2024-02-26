import { type Request, type Response, type NextFunction } from 'express';
import jwt, { TokenExpiredError, type JwtPayload } from 'jsonwebtoken';

import { env } from '@/config';
import { UnauthorizedError } from '@/utils/api-errors';
import UserModel from '../models/users.model';

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Not authorized');
  }

  const [, token] = authorization.split(' ');

  const { sub } = jwt.verify(token, env.jwtPass, (err, decoded) => {
    if (err instanceof TokenExpiredError) {
      throw new UnauthorizedError('Token has expired');
    }

    return decoded;
  }) as unknown as JwtPayload;

  const user = await UserModel.findById(sub).then((tokenUser) =>
    tokenUser?.toObject(),
  );
  if (!user) {
    throw new UnauthorizedError('Not authorized');
  }

  delete user.password;

  req.user = user;

  return next();
};

export default isAuthenticated;
