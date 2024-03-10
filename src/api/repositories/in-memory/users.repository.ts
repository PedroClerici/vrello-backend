import { Types } from 'mongoose';

import { type User } from '@/api/models/users.model';
import { type UsersRepository } from '..';

class UsersRepositoryInMemory implements UsersRepository {
  public data: User[] = [];

  async create(params: Omit<User, 'id'>): Promise<User | null> {
    const user = { id: new Types.ObjectId(), ...params };
    this.data.push(user);

    return this.data.find((foundUser) => foundUser.id === user.id) ?? null;
  }

  async findAll(): Promise<User[]> {
    return this.data;
  }

  async findById(id: string): Promise<User | null> {
    return this.data.find((user) => user.id.toString() === id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.data.find((user) => user.email === email) ?? null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.data.find((user) => user.username === username) ?? null;
  }

  async update(id: string, params: Partial<User>): Promise<User | null> {
    const foundUserIndex = this.data.findIndex(
      (user) => user.id.toString() === id,
    );

    if (foundUserIndex === -1) {
      return null;
    }

    const user = this.data[foundUserIndex];
    Object.assign(user, params);
    this.data[foundUserIndex] = user;

    return user;
  }

  async delete(id: string): Promise<User | null> {
    const foundUser = this.data.find((user) => user.id.toString() === id);

    if (!foundUser) {
      return null;
    }

    this.data = this.data.filter((user) => user.id !== foundUser.id);

    return foundUser;
  }
}

export default UsersRepositoryInMemory;
