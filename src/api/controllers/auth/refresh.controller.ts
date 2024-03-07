import { type Request, type Response } from 'express';

import RefreshRequestDTO from '@/api/dtos/refresh/refresh-request.dto';
import RefreshService from '@/api/services/auth/refresh.service';
import MongooseUsersRepository from '@/api/repositories/users.repository';

const refresh = async (request: Request, response: Response) => {
  const data = new RefreshRequestDTO({ ...request.cookies });

  const [token, newRefreshToken] = await new RefreshService(
    new MongooseUsersRepository(),
  ).execute(data);

  return response
    .status(200)
    .cookie('refreshToken', newRefreshToken)
    .json({ token });
};

export default refresh;
