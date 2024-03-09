import { Types, isValidObjectId } from 'mongoose';

import { type User } from '@/api/models/users.model';
import { type UsersRepository } from '..';

class UsersRepositoryInMemory implements UsersRepository {
  private users: User[] = [];

  async create(params: Omit<User, 'id'>): Promise<User | null> {
    const user = { id: new Types.ObjectId(), ...params };
    this.users.push(user);

    return this.users.find((foundUser) => foundUser.id === user.id) ?? null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    if (!isValidObjectId(id)) {
      return null;
    }

    return (
      this.users.find((user) => user.id === new Types.ObjectId(id)) ?? null
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async update(id: string, params: Partial<User>): Promise<User | null> {
    if (!isValidObjectId(id)) {
      return null;
    }

    const foundUserIndex = this.users.findIndex(
      (user) => user.id === new Types.ObjectId(id),
    );

    if (foundUserIndex === -1) {
      return null;
    }

    const user = { ...params, ...this.users[foundUserIndex] };
    this.users[foundUserIndex] = user;
    return user;
  }

  async delete(id: string): Promise<User | null> {
    if (!isValidObjectId(id)) {
      return null;
    }

    const foundUserIndex = this.users.findIndex(
      (user) => user.id === new Types.ObjectId(id),
    );

    if (foundUserIndex === -1) {
      return null;
    }

    const user = this.users[foundUserIndex];

    this.users.splice(foundUserIndex, 1);

    return user;
  }
}

export default UsersRepositoryInMemory;
