import { type UsersRepository } from '@/api/repositories';
import type GetUserByIdRequestDTO from '@/api/dtos/users/get-user-by/get-user-by-id-request.dto';
import { BadRequestError } from '@/utils/api-errors';

class GetUserByIdService {
  public constructor(private readonly userRepository: UsersRepository) {}

  public async execute(data: GetUserByIdRequestDTO) {
    const user = await this.userRepository.findById(data.get('id'));

    if (!user) {
      throw new BadRequestError("Couldn't find user");
    }

    return user;
  }
}

export default GetUserByIdService;
