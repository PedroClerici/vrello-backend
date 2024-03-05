import { type UsersRepository } from '@/api/repositories';

class FetchUsersService {
  public constructor(private readonly userRepository: UsersRepository) {}

  public async execute() {
    const users = await this.userRepository.findAll();

    return users;
  }
}

export default FetchUsersService;
