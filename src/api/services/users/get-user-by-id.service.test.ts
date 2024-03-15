import { Types } from 'mongoose';

import GetUserByIdService from './get-user-by-id.service';
import UsersRepositoryInMemory from '@/api/repositories/in-memory/users.repository';
import GetUserByIdRequestDTO from '@/api/dtos/get-user-by/get-user-by-id-request.dto';
import makeUser from '@/tests/helpers/make-user.factory';
import { BadRequestError } from '@/utils/api-errors';

describe('Get user by id', () => {
  let usersRepository: UsersRepositoryInMemory;
  let sut: GetUserByIdService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    sut = new GetUserByIdService(usersRepository);
  });

  it('should be able to find a user by the id', async () => {
    const user = makeUser();

    usersRepository.create(makeUser());
    usersRepository.create(makeUser());
    usersRepository.create(user);

    expect(usersRepository.data).toHaveLength(3);

    const data = new GetUserByIdRequestDTO({
      id: user.id.toString(),
    });

    const userFound = await sut.execute(data);

    expect(userFound).toStrictEqual(user);
  });

  it("should throw an error if it couldn't find a user with related id", async () => {
    usersRepository.create(makeUser());

    expect(usersRepository.data).toHaveLength(1);

    const data = new GetUserByIdRequestDTO({
      id: new Types.ObjectId().toString(),
    });

    await expect(sut.execute(data)).rejects.toBeInstanceOf(BadRequestError);

    expect(usersRepository.data).toHaveLength(1);
  });
});
