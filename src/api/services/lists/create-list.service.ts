import { type ListsRepository } from '@/api/repositories/index';
import CreateListRequestDTO from '@/api/dtos/lists/create-list/create-list-request.dto';

class CreateListService {
  public constructor(private readonly listsRepository: ListsRepository) {}

  public async execute(data: CreateListRequestDTO) {
    const list = await this.listsRepository.create(data.getAll());

    if (!list) {
      throw new Error("Couldn't create list");
    }

    return list;
  }
}

export default CreateListService;
