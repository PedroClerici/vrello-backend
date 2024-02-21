import { type Router } from 'express';

import * as userController from '../controllers/users.controller';
import validateResource from '../middlewares/validate-resource';
import { createUserSchema, getUserSchema } from '../schemas/users.schemas';

const usersRoutes = (router: Router) => {
  router.post(
    '/users',
    validateResource(createUserSchema),
    userController.createUser,
  );
  router.get('/users', userController.getAllUsers);
  router.get(
    '/users/:id',
    validateResource(getUserSchema),
    userController.getUser,
  );
  router.patch('/users/:id', userController.updateUser);
  router.delete('/users/:id', userController.deleteUser);
};

export default usersRoutes;
