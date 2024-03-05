import { type UsersRepository } from '@/api/repositories';
import type UpdateUserRequestDTO from '@/api/dtos/update-user/update-user-request.dto';
import { BadRequestError } from '@/utils/api-errors';

class UpdateUserService {
  public constructor(private readonly userRepository: UsersRepository) {}

  public async execute(data: UpdateUserRequestDTO) {
    const { id, ...userInput } = data.getAll();

    const userUpdated = await this.userRepository.update(id, userInput);

    if (!userUpdated) {
      throw new BadRequestError("Couldn't find user");
    }

    return userUpdated;
  }
}

export default UpdateUserService;
