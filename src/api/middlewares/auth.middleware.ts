import { type Request, type Response, type NextFunction } from 'express';
import jwt, { TokenExpiredError, type JwtPayload } from 'jsonwebtoken';

import { env } from '@/config';
import { UnauthorizedError } from '@/utils/api-errors';
import GetUserByIdService from '../services/users/get-user-by-id.service';
import UsersRepositoryMongoose from '../repositories/mongoose/users.repository';
import GetUserByIdRequestDTO from '../dtos/get-user-by/get-user-by-id-request.dto';
import GetUserByResponseDTO from '../dtos/get-user-by/get-user-by-response.dto';

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

  const { sub } = jwt.verify(token, env.JWT_PASS, (err, decoded) => {
    if (err instanceof TokenExpiredError) {
      throw new UnauthorizedError('Token has expired');
    }

    return decoded;
  }) as unknown as JwtPayload;

  const user = await new GetUserByIdService(
    new UsersRepositoryMongoose(),
  ).execute(new GetUserByIdRequestDTO({ id: sub }));

  if (!user) {
    throw new UnauthorizedError('Not authorized');
  }

  req.user = new GetUserByResponseDTO(user).getAll();

  return next();
};

export default isAuthenticated;
