import { faker } from '@faker-js/faker';

import GetUserByEmailService from './get-user-by-email.service';
import UsersRepositoryInMemory from '@/api/repositories/in-memory/users.repository';
import GetUserByEmailRequestDTO from '@/api/dtos/get-user-by/get-user-by-email-request.dto';
import makeUser from '@/tests/helpers/make-user.factory';
import { BadRequestError } from '@/utils/api-errors';

describe('Get user by email', () => {
  let usersRepository: UsersRepositoryInMemory;
  let sut: GetUserByEmailService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    sut = new GetUserByEmailService(usersRepository);
  });

  it('should be able to find a user by the email', async () => {
    const user = makeUser({ email: 'existing@email.com' });

    usersRepository.create(makeUser());
    usersRepository.create(makeUser());
    usersRepository.create(user);

    expect(usersRepository.data).toHaveLength(3);

    const data = new GetUserByEmailRequestDTO({
      email: user.email,
    });

    const userFound = await sut.execute(data);

    expect(userFound).toStrictEqual(user);
  });

  it("should throw an error if it couldn't find a user with related email", async () => {
    usersRepository.create(makeUser());

    expect(usersRepository.data).toHaveLength(1);

    const data = new GetUserByEmailRequestDTO({
      email: faker.internet.email(),
    });

    await expect(sut.execute(data)).rejects.toBeInstanceOf(BadRequestError);
  });
});
