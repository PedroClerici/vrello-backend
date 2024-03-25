import { CardModel, type Card } from '@/api/models/cards.model';
import { CardsRepository } from '..';

class CardsRepositoryMongoose implements CardsRepository {
  async create(params: Omit<Card, 'id'>): Promise<Card | null> {
    const card = await CardModel.create(params);
    return card.toObject();
  }

  async findAll(): Promise<Card[]> {
    const cards = await CardModel.find();
    return cards.map((card) => card.toObject());
  }

  async findById(id: string): Promise<Card | null> {
    const card = await CardModel.findById(id);

    if (!card) {
      return null;
    }

    return card.toObject();
  }

  async findByBoard(boardId: string): Promise<Card[]> {
    const cards = await CardModel.find({ board: boardId });

    return cards.map((card) => card.toObject());
  }

  async findByList(listId: string): Promise<Card[]> {
    const cards = await CardModel.find({ list: listId });

    return cards.map((card) => card.toObject());
  }

  async update(id: string, params: Partial<Card>): Promise<Card | null> {
    const card = await CardModel.findByIdAndUpdate({ _id: id }, params, {
      new: true,
    });

    if (!card) {
      return null;
    }

    return card.toObject();
  }

  async delete(id: string): Promise<Card | null> {
    const card = await CardModel.findByIdAndDelete(id);

    if (!card) {
      return null;
    }

    return card.toObject();
  }
}

export default CardsRepositoryMongoose;
