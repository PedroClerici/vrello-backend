import { beforeAll, describe, expect, it } from 'vitest';

import { type UsersRepository } from '@/api/repositories';
import UsersRepositoryInMemory from '@/api/repositories/in-memory/users.repository';
import RegisterRequestDTO from '@/api/dtos/register/register-request.dto';
import RegisterService from './register.service';

describe('Register user', () => {
  let usersRepository: UsersRepository;
  let registerService: RegisterService;

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    registerService = new RegisterService(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const userData = new RegisterRequestDTO({
      email: 'test@test.com.br',
      username: 'test username',
      password: 'password',
    });

    const user = await registerService.execute(userData);

    expect(user).toHaveProperty('id');
    expect(user.username).toBe('test username');
  });

  it('should not be able to create an user with the same email', async () => {
    const userData = new RegisterRequestDTO({
      email: 'test@test.com.br',
      username: 'another test username',
      password: 'password',
    });

    await expect(registerService.execute(userData)).rejects.toThrowError(
      'User already exists',
    );
  });

  it('should not be able to create an user with the same username', async () => {
    const userData = new RegisterRequestDTO({
      email: 'anothertest@test.com.br',
      username: 'test username',
      password: 'password',
    });

    await expect(registerService.execute(userData)).rejects.toThrowError(
      'User already exists',
    );
  });
});
