import { Types } from 'mongoose';

import { BadRequestError, NotFoundError } from '@/utils/api-errors';
import { type UsersRepository } from '../repositories';
import { type User } from '../models/users.model';
import { MongooseUsersRepository } from '../repositories/users.repository';

class UsersService {
  private readonly userRepository;

  constructor(usersRepository: UsersRepository) {
    this.userRepository = usersRepository;
  }

  async createUser(user: Omit<User, 'id'>) {
    const userAlreadyExists = await this.userRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new BadRequestError('User already exists');
    }

    const userCreated = await this.userRepository.create(user);

    if (!userCreated) {
      throw new Error("Couldn't create user");
    }

    delete (userCreated as { password?: string }).password;

    return userCreated;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();

    return users.map((user) => {
      // eslint-disable-next-line no-param-reassign
      delete (user as { password?: string }).password;
      return user;
    });
  }

  async getUserById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundError("Couldn't find user");
    }

    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new NotFoundError("Couldn't find user");
    }

    delete (userFound as { password?: string }).password;

    return userFound;
  }

  getUserByEmail = async (email: string) => {
    const userFound = await this.userRepository.findByEmail(email);

    if (!userFound) {
      throw new NotFoundError("Couldn't find user");
    }

    delete (userFound as { password?: string }).password;

    return userFound;
  };

  async updateUser(id: string, user: Partial<User>) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundError("Couldn't find user");
    }

    const userUpdated = await this.userRepository.update(id, user);

    if (!userUpdated) {
      throw new NotFoundError("Couldn't find user");
    }

    delete (userUpdated as { password?: string }).password;

    return userUpdated;
  }

  async deleteUser(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundError("Couldn't find user");
    }

    const userDeleted = await this.userRepository.delete(id);

    if (!userDeleted) {
      throw new NotFoundError("Couldn't find user");
    }

    delete (userDeleted as { password?: string }).password;

    return userDeleted;
  }
}

export default new UsersService(new MongooseUsersRepository());
