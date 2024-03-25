import { type User } from '../models/users.model';
import { type Board } from '../models/boards.model';
import { type List } from '../models/lists.model';
import { type Card } from '../models/cards.model';

export interface BaseRepository<T> {
  create(params: Omit<T, 'id'>): Promise<T | null>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, params: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}

export interface UsersRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}

export interface BoardsRepository extends BaseRepository<Board> {
  findByAuthor(authorId: string): Promise<Board[]>;
}

export interface ListsRepository extends BaseRepository<List> {
  findByBoard(boardId: string): Promise<List[]>;
}

export interface CardsRepository extends BaseRepository<Card> {
  findByList(listId: string): Promise<Card[]>;
  findByBoard(boardId: string): Promise<Card[]>;
}
