import { type User } from '../models/users.model';

export interface BaseRepository<T> {
  create(params: Omit<T, 'id'>): Promise<T | null>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, params: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}

export interface UsersRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
