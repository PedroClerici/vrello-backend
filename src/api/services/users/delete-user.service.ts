import { type UsersRepository } from '@/api/repositories';
import type DeleteUserRequestDTO from '@/api/dtos/delete-user/delete-user-request.dto';
import { BadRequestError } from '@/utils/api-errors';

class DeleteUserService {
  public constructor(private readonly userRepository: UsersRepository) {}

  public async execute(data: DeleteUserRequestDTO) {
    const userDeleted = await this.userRepository.delete(data.get('id'));

    if (!userDeleted) {
      throw new BadRequestError("Couldn't find user");
    }

    return userDeleted;
  }
}

export default DeleteUserService;
