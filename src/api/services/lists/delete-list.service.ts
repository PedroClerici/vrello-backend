import { type ListsRepository } from '@/api/repositories/index';
import DeleteListRequestDTO from '@/api/dtos/lists/delete-list/delete-delete-request.dto';
import { BadRequestError } from '@/utils/api-errors';

class DeleteListService {
  public constructor(private readonly listsRepository: ListsRepository) {}

  public async execute(data: DeleteListRequestDTO) {
    const list = await this.listsRepository.delete(data.get('id'));

    if (!list) {
      throw new BadRequestError("Couldn't find list");
    }

    return list;
  }
}

export default DeleteListService;
