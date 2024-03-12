import jwt, { type JwtPayload, TokenExpiredError } from 'jsonwebtoken';

import { env } from '@/config';
import { UnauthorizedError } from '@/utils/api-errors';
import { type UsersRepository } from '@/api/repositories';
import type RefreshRequestDTO from '@/api/dtos/refresh/refresh-request.dto';

class RefreshService {
  public constructor(private readonly userRepository: UsersRepository) {}

  public async execute(data: RefreshRequestDTO) {
    const { sub } = jwt.verify(
      data.get('refreshToken'),
      env.JWT_PASS,
      (err, decoded) => {
        if (err instanceof TokenExpiredError) {
          throw new UnauthorizedError('Token has expired');
        }

        if (err) {
          throw new UnauthorizedError('Invalid token');
        }

        return decoded;
      },
    ) as unknown as JwtPayload;

    const user = await this.userRepository.findById(sub!);
    if (!user) {
      throw new UnauthorizedError('Invalid token');
    }

    const token = jwt.sign({}, env.JWT_PASS, {
      subject: user.id.toString(),
      expiresIn: env.JWT_TOKEN_EXPIRE,
    });

    const newRefreshToken = jwt.sign({}, env.JWT_PASS, {
      subject: user.id.toString(),
      expiresIn: env.JWT_REFRESH_TOKEN_EXPIRE,
    });

    return [token, newRefreshToken];
  }
}

export default RefreshService;
