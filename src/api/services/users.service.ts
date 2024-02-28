import { Types } from 'mongoose';

import { BadRequestError, NotFoundError } from '@/utils/api-errors';
import UserModel, { type User } from '../models/users.model';

class UsersService {
  async createUser(user: User) {
    const userAlreadyExists = await UserModel.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });

    if (userAlreadyExists) {
      throw new BadRequestError('User already exists');
    }

    const userCreated = await UserModel.create(user).then((newUser) =>
      newUser.toObject(),
    );

    delete userCreated.password;

    return userCreated;
  }

  async getAllUsers() {
    return UserModel.find().then((users) =>
      users.map((user) => user.toObject()),
    );
  }

  async getUserById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundError("Couldn't find user");
    }

    const userFound = await UserModel.findById(id);

    if (!userFound) {
      throw new NotFoundError("Couldn't find user");
    }

    return userFound.toObject();
  }

  getUserByEmail = async (email: string) => {
    const userFound = await UserModel.findOne({ email });

    if (!userFound) {
      throw new NotFoundError("Couldn't find user");
    }

    return userFound.toObject();
  };

  async updateUser(id: string, user: Partial<User>) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundError("Couldn't find user");
    }

    const userUpdated = await UserModel.findByIdAndUpdate({ _id: id }, user, {
      new: true,
    });

    if (!userUpdated) {
      throw new NotFoundError("Couldn't find user");
    }

    return userUpdated.toObject();
  }

  async deleteUser(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundError("Couldn't find user");
    }

    const userDeleted = await UserModel.findByIdAndDelete(id);

    if (!userDeleted) {
      throw new NotFoundError("Couldn't find user");
    }

    return userDeleted.toObject();
  }
}

export default new UsersService();
