import FetchUsersService from './fetch-users.service';
import UsersRepositoryInMemory from '@/api/repositories/in-memory/users.repository';
import makeUser from '@/tests/helpers/make-user.factory';

describe('Fetch users', () => {
  let usersRepository: UsersRepositoryInMemory;
  let sut: FetchUsersService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    sut = new FetchUsersService(usersRepository);
  });

  it('should be able fetch all users', async () => {
    usersRepository.create(makeUser());
    usersRepository.create(makeUser());
    usersRepository.create(makeUser());

    expect(usersRepository.data).toHaveLength(3);

    const users = await sut.execute();

    expect(users).toHaveLength(3);
  });
});
