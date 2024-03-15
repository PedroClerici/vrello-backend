import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';

import { env } from '@/config';
import { UnauthorizedError } from './api-errors';

export const signJwt = (
  options?: jwt.SignOptions | undefined,
  object: Object = {},
) => jwt.sign(object, env.JWT_PASS, options);

export const verifyJwt = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, env.JWT_PASS) as JwtPayload;
  } catch (err: unknown) {
    if (err instanceof TokenExpiredError) {
      throw new UnauthorizedError('Token has expired');
    }

    throw new UnauthorizedError('Token is invalid');
  }
};
