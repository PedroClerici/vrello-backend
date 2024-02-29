import bcrypt from 'bcrypt';
import jwt, { type JwtPayload, TokenExpiredError } from 'jsonwebtoken';

import { env } from '@/config';
import { UnauthorizedError } from '@/utils/api-errors';
import { type User } from '../models/users.model';
import { type UsersRepository } from '../repositories';
import { MongooseUsersRepository } from '../repositories/users.repository';

class AuthService {
  private readonly userRepository;

  constructor(usersRepository: UsersRepository) {
    this.userRepository = usersRepository;
  }

  async register(user: User) {
    const hashedPassword = await bcrypt.hash(user.password!, env.saltRounds);

    const userRegistered = await this.userRepository.create({
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });

    return userRegistered;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Email or password are invalid');
    }

    const verifyPassword = await bcrypt.compare(password, user.password!);
    if (!verifyPassword) {
      throw new UnauthorizedError('Email or password are invalid');
    }

    const token = jwt.sign({}, env.jwtPass, {
      subject: user.id.toString(),
      expiresIn: '5m',
    });

    const refreshToken = jwt.sign({}, env.jwtPass, {
      subject: user.id.toString(),
      expiresIn: '7d',
    });

    return [token, refreshToken];
  }

  async refresh(refreshToken: string) {
    const { sub } = jwt.verify(refreshToken, env.jwtPass, (err, decoded) => {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedError('Token has expired');
      }

      if (err) {
        throw new UnauthorizedError('Invalid token');
      }

      return decoded;
    }) as unknown as JwtPayload;

    const user = await this.userRepository.findById(sub!);
    if (!user) {
      throw new UnauthorizedError('Invalid token');
    }

    const token = jwt.sign({}, env.jwtPass, {
      subject: user.id.toString(),
      expiresIn: '5m',
    });

    const newRefreshToken = jwt.sign({}, env.jwtPass, {
      subject: user.id.toString(),
      expiresIn: '7d',
    });

    return [token, newRefreshToken];
  }
}

export default new AuthService(new MongooseUsersRepository());
