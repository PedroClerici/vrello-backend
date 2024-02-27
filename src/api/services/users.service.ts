import { Types } from 'mongoose';

import UserModel, { type User } from '../models/users.model';

export const createUser = async (user: User) => {
  const userAlreadyExists = await UserModel.findOne({
    $or: [{ email: user.email }, { username: user.username }],
  });

  if (userAlreadyExists) {
    return null;
  }

  const userCreated = await UserModel.create(user).then((newUser) =>
    newUser.toObject(),
  );

  delete userCreated.password;

  return userCreated;
};

export const getAllUsers = async () =>
  UserModel.find().then((users) => users.map((user) => user.toObject()));

export const getUserById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  const userFound = await UserModel.findById(id);

  if (!userFound) {
    return null;
  }

  return userFound.toObject();
};

export const getUserByEmail = async (email: string) => {
  const userFound = await UserModel.findOne({ email });

  if (!userFound) {
    return null;
  }

  return userFound.toObject();
};

export const updateUser = async (id: string, user: Partial<User>) => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  const userUpdated = await UserModel.findByIdAndUpdate({ _id: id }, user, {
    new: true,
  });

  if (!userUpdated) {
    return null;
  }

  return userUpdated.toObject();
};

export const deleteUser = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  const userDeleted = await UserModel.findByIdAndDelete(id);

  if (!userDeleted) {
    return null;
  }

  return userDeleted.toObject();
};
