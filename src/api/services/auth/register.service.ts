import bcrypt from 'bcrypt';

import { env } from '@/config';
import { BadRequestError } from '@/utils/api-errors';
import { type UsersRepository } from '@/api/repositories';
import type RegisterRequestDTO from '@/api/dtos/register/register-request.dto';

class RegisterService {
  public constructor(private readonly userRepository: UsersRepository) {}

  public async execute(data: RegisterRequestDTO) {
    const userEmailAlreadyExists = await this.userRepository.findByEmail(
      data.get('email'),
    );

    if (userEmailAlreadyExists) {
      throw new BadRequestError('User with this email already exists');
    }

    const userUsernameAlreadyExists = await this.userRepository.findByUsername(
      data.get('username'),
    );

    if (userUsernameAlreadyExists) {
      throw new BadRequestError('User with this username already exists');
    }

    const user = {
      ...data.getAll(),
    };

    const passwordHash = await bcrypt.hash(
      data.get('password'),
      env.saltRounds,
    );

    user.password = passwordHash;

    const userCreated = await this.userRepository.create(user);

    if (!userCreated) {
      throw new Error("Couldn't create user");
    }

    return userCreated;
  }
}

export default RegisterService;
