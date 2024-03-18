import { BoardModel, type Board } from '@/api/models/boards.model';
import { type BoardsRepository } from '..';

class BoardsRepositoryMongoose implements BoardsRepository {
  async create(params: Omit<Board, 'id'>): Promise<Board | null> {
    const board = await BoardModel.create(params);
    return board.toObject();
  }

  async findAll(): Promise<Board[]> {
    const boards = await BoardModel.find();
    return boards.map((board) => board.toObject());
  }

  async findById(id: string): Promise<Board | null> {
    const board = await BoardModel.findById(id);

    if (!board) {
      return null;
    }

    return board.toObject();
  }

  async findByAuthor(authorId: string): Promise<Board[]> {
    const boards = await BoardModel.find({ author: authorId });

    return boards.map((board) => board.toObject());
  }

  async update(id: string, params: Partial<Board>): Promise<Board | null> {
    const board = await BoardModel.findByIdAndUpdate({ _id: id }, params, {
      new: true,
    });

    if (!board) {
      return null;
    }

    return board.toObject();
  }

  async delete(id: string): Promise<Board | null> {
    const board = await BoardModel.findByIdAndDelete(id);

    if (!board) {
      return null;
    }

    return board.toObject();
  }
}

export default BoardsRepositoryMongoose;
