import { env } from '@/config';
import { signJwt, verifyJwt } from '@/utils/jwt';
import { UnauthorizedError } from '@/utils/api-errors';
import { type UsersRepository } from '@/api/repositories';
import type RefreshRequestDTO from '@/api/dtos/refresh/refresh-request.dto';

class RefreshService {
  public constructor(private readonly userRepository: UsersRepository) {}

  public async execute(data: RefreshRequestDTO) {
    const { sub } = verifyJwt(data.get('refreshToken'));

    const user = await this.userRepository.findById(sub!);
    if (!user) {
      throw new UnauthorizedError('Invalid token');
    }

    const token = signJwt({
      subject: user.id.toString(),
      expiresIn: env.JWT_TOKEN_EXPIRE,
    });

    const newRefreshToken = signJwt({
      subject: user.id.toString(),
      expiresIn: env.JWT_REFRESH_TOKEN_EXPIRE,
    });

    return [token, newRefreshToken];
  }
}

export default RefreshService;
