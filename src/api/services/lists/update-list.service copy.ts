import { type ListsRepository } from '@/api/repositories/index';
import UpdateListRequestDTO from '@/api/dtos/lists/update-list/update-list-request.dto';
import { BadRequestError } from '@/utils/api-errors';

class UpdateListService {
  public constructor(private readonly listsRepository: ListsRepository) {}

  public async execute(data: UpdateListRequestDTO) {
    const { id, ...listInput } = data.getAll();

    const listUpdated = await this.listsRepository.update(id, listInput);

    if (!listUpdated) {
      throw new BadRequestError("Couldn't find list");
    }

    return listUpdated;
  }
}

export default UpdateListService;
