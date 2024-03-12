import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { env } from '@/config';
import { UnauthorizedError } from '@/utils/api-errors';
import { type UsersRepository } from '@/api/repositories';
import type LoginRequestDTO from '@/api/dtos/login/login-request.dto';

class LoginService {
  public constructor(private readonly userRepository: UsersRepository) {}

  public async execute(data: LoginRequestDTO) {
    const user = await this.userRepository.findByEmail(data.get('email'));

    if (!user) {
      throw new UnauthorizedError('Email or password are invalid');
    }

    const verifyPassword = await bcrypt.compare(
      data.get('password'),
      user.password,
    );

    if (!verifyPassword) {
      throw new UnauthorizedError('Email or password are invalid');
    }

    const token = jwt.sign({}, env.JWT_PASS, {
      subject: user.id.toString(),
      expiresIn: env.JWT_TOKEN_EXPIRE,
    });

    const refreshToken = jwt.sign({}, env.JWT_PASS, {
      subject: user.id.toString(),
      expiresIn: env.JWT_REFRESH_TOKEN_EXPIRE,
    });

    return [token, refreshToken];
  }
}

export default LoginService;
