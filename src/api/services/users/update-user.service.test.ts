import { Types } from 'mongoose';

import UpdateUserService from './update-user.service';
import UpdateUserRequestDTO from '@/api/dtos/update-user/update-user-request.dto';
import UsersRepositoryInMemory from '@/api/repositories/in-memory/users.repository';
import makeUser from '@/tests/helpers/make-user.factory';
import { BadRequestError } from '@/utils/api-errors';

describe('Get user by id', () => {
  let usersRepository: UsersRepositoryInMemory;
  let sut: UpdateUserService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    sut = new UpdateUserService(usersRepository);
  });

  it('should be able to update user', async () => {
    const user = makeUser();
    const update = {
      id: user.id.toString(),
      username: 'updated',
      email: 'updated@email.com',
    };

    usersRepository.create(makeUser());
    usersRepository.create(makeUser());
    usersRepository.create(user);

    expect(usersRepository.data).toHaveLength(3);

    const userUpdated = await sut.execute(new UpdateUserRequestDTO(update));

    expect(userUpdated.email).toBe(update.email);
    expect(userUpdated.username).toBe(update.username);
  });

  it('should be able to update single property', async () => {
    const user = makeUser();

    const updateUsername = {
      id: user.id.toString(),
      username: 'updated',
    };

    const updateEmail = {
      id: user.id.toString(),
      email: 'updated@email.com',
    };

    usersRepository.create(makeUser());
    usersRepository.create(makeUser());
    usersRepository.create(user);

    expect(usersRepository.data).toHaveLength(3);

    const usernameUpdated = await sut.execute(
      new UpdateUserRequestDTO(updateUsername),
    );
    expect(usernameUpdated.username).toBe(updateUsername.username);

    const emailUpdated = await sut.execute(
      new UpdateUserRequestDTO(updateEmail),
    );
    expect(emailUpdated.email).toBe(updateEmail.email);
  });

  it("should throw an error if it couldn't find a user with related id", async () => {
    usersRepository.create(makeUser());

    expect(usersRepository.data).toHaveLength(1);

    const data = new UpdateUserRequestDTO({
      id: new Types.ObjectId().toString(),
      username: 'updated',
      email: 'updated@email.com',
    });

    await expect(sut.execute(data)).rejects.toBeInstanceOf(BadRequestError);

    expect(usersRepository.data).toHaveLength(1);
  });
});
