import { Types } from 'mongoose';

import DeleteUserRequestDTO from '@/api/dtos/delete-user/delete-user-request.dto';
import makeUser from '../auth/make-user.factory';
import DeleteUserService from './delete-user.service';
import UsersRepositoryInMemory from '@/api/repositories/in-memory/users.repository';
import { BadRequestError } from '@/utils/api-errors';

describe('Delete user', () => {
  let usersRepository: UsersRepositoryInMemory;
  let sut: DeleteUserService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    sut = new DeleteUserService(usersRepository);
  });

  it('should be able delete a user by the id', async () => {
    const user = makeUser();

    usersRepository.create(user);
    usersRepository.create(makeUser());

    expect(usersRepository.data).toHaveLength(2);

    const userDeleted = await sut.execute(
      new DeleteUserRequestDTO({ id: user.id.toString() }),
    );

    expect(usersRepository.data).toHaveLength(1);
    expect(userDeleted).toStrictEqual(user);
  });

  it("should throw an error if it couldn't find a user with related id", async () => {
    usersRepository.create(makeUser());

    expect(usersRepository.data).toHaveLength(1);

    const data = new DeleteUserRequestDTO({
      id: new Types.ObjectId().toString(),
    });

    await expect(sut.execute(data)).rejects.toBeInstanceOf(BadRequestError);

    expect(usersRepository.data).toHaveLength(1);
  });
});
