import { type UsersRepository } from '@/api/repositories';
import type GetUserByEmailRequestDTO from '@/api/dtos/get-user-by/get-user-by-email-request.dto';
import { BadRequestError } from '@/utils/api-errors';

class GetUserByEmailService {
  public constructor(private readonly userRepository: UsersRepository) {}

  public async execute(data: GetUserByEmailRequestDTO) {
    const user = await this.userRepository.findByEmail(data.get('email'));

    if (!user) {
      throw new BadRequestError("Couldn't find user");
    }

    return user;
  }
}

export default GetUserByEmailService;
