import bcrypt from 'bcrypt';

import RegisterService from './register.service';
import RegisterRequestDTO from '@/api/dtos/auth/register/register-request.dto';
import UsersRepositoryInMemory from '@/api/repositories/in-memory/users.repository';
import makeUser from '@/tests/helpers/make-user.factory';
import { BadRequestError } from '@/utils/api-errors';

describe('Register user', () => {
  let usersRepository: UsersRepositoryInMemory;
  let sut: RegisterService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    sut = new RegisterService(usersRepository);
  });

  it('should be able to create a new user with a hashed password', async () => {
    const userData = new RegisterRequestDTO(makeUser());

    const user = await sut.execute(userData);

    expect(user).toHaveProperty('id');
    expect(user.username).toBe(userData.get('username'));
    expect(await bcrypt.compare(userData.get('password'), user.password)).toBe(
      true,
    );
    expect(usersRepository.data).toHaveLength(1);
  });

  it('should not be able to create an user with the same email', async () => {
    usersRepository.create(
      makeUser({
        email: 'existing@email.com',
      }),
    );

    const userData = new RegisterRequestDTO(
      makeUser({ email: 'existing@email.com' }),
    );

    await expect(sut.execute(userData)).rejects.toBeInstanceOf(BadRequestError);
  });

  it('should not be able to create an user with the same username', async () => {
    usersRepository.create(
      makeUser({
        username: 'existing username',
      }),
    );

    const userData = new RegisterRequestDTO(
      makeUser({ username: 'existing username' }),
    );

    await expect(sut.execute(userData)).rejects.toBeInstanceOf(BadRequestError);
  });
});
