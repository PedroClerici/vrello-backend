import { ListModel, type List } from '@/api/models/lists.model';
import { type ListsRepository } from '..';

class ListsRepositoryMongoose implements ListsRepository {
  async create(params: Omit<List, 'id'>): Promise<List | null> {
    const list = await ListModel.create(params);
    return list.toObject();
  }

  async findAll(): Promise<List[]> {
    const lists = await ListModel.find();
    return lists.map((list) => list.toObject());
  }

  async findById(id: string): Promise<List | null> {
    const list = await ListModel.findById(id);

    if (!list) {
      return null;
    }

    return list.toObject();
  }

  async findByBoard(boardId: string): Promise<List[]> {
    const lists = await ListModel.find({ board: boardId });

    return lists.map((list) => list.toObject());
  }

  async update(id: string, params: Partial<List>): Promise<List | null> {
    const list = await ListModel.findByIdAndUpdate({ _id: id }, params, {
      new: true,
    });

    if (!list) {
      return null;
    }

    return list.toObject();
  }

  async delete(id: string): Promise<List | null> {
    const list = await ListModel.findByIdAndDelete(id);

    if (!list) {
      return null;
    }

    return list.toObject();
  }
}

export default ListsRepositoryMongoose;
