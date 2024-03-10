import UserModel, { type User } from '../../models/users.model';
import { type UsersRepository } from '..';

class UsersRepositoryMongoose implements UsersRepository {
  async create(params: Omit<User, 'id'>): Promise<User | null> {
    const user = await UserModel.create(params);
    return user.toObject();
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find();
    return users.map((user) => user.toObject());
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);

    if (!user) {
      return null;
    }

    return user.toObject();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return null;
    }

    return user.toObject();
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return null;
    }

    return user.toObject();
  }

  async update(id: string, params: Partial<User>): Promise<User | null> {
    const user = await UserModel.findByIdAndUpdate({ _id: id }, params, {
      new: true,
    });

    if (!user) {
      return null;
    }

    return user.toObject();
  }

  async delete(id: string): Promise<User | null> {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return null;
    }

    return user.toObject();
  }
}

export default UsersRepositoryMongoose;
