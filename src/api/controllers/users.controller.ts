import { type Request, type Response } from 'express';

import GetUserByIdRequestDTO from '../dtos/get-user-by/get-user-by-id-request.dto';
import GetUserByIdService from '../services/users/get-user-by-id.service';
import { MongooseUsersRepository } from '../repositories/users.repository';
import GetUserByResponseDTO from '../dtos/get-user-by/get-user-by-response.dto';
import UpdateUserRequestDTO from '../dtos/update-user/update-user-request.dto';
import UpdateUserService from '../services/users/update-user.service';
import UpdateUserResponseDTO from '../dtos/update-user/update-user-response.dto';
import DeleteUserRequestDTO from '../dtos/delete-user/delete-user-request.dto';
import DeleteUserService from '../services/users/delete-user.service';
import FetchUsersService from '../services/users/fetch-users.service';
import FetchUsersResponseDTO from '../dtos/fetch-users/fetch-users-response.dto';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await new FetchUsersService(
    new MongooseUsersRepository(),
  ).execute();

  return res.json(
    users.map((user) => new FetchUsersResponseDTO(user).getAll()),
  );
};

export const getUser = async (req: Request, res: Response) => {
  const data = new GetUserByIdRequestDTO({ ...req.params });

  const user = await new GetUserByIdService(
    new MongooseUsersRepository(),
  ).execute(data);

  return res.status(200).json(new GetUserByResponseDTO(user).getAll());
};

export const updateUser = async (req: Request, res: Response) => {
  const data = new UpdateUserRequestDTO({ ...req.params, ...req.body });

  const userUpdated = await new UpdateUserService(
    new MongooseUsersRepository(),
  ).execute(data);

  return res.status(200).json(new UpdateUserResponseDTO(userUpdated).getAll());
};

export const deleteUser = async (req: Request, res: Response) => {
  const data = new DeleteUserRequestDTO({ ...req.params });

  const userDeleted = await new DeleteUserService(
    new MongooseUsersRepository(),
  ).execute(data);

  return res.status(200).json(new GetUserByResponseDTO(userDeleted).getAll());
};
