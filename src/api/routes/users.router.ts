import { Router } from 'express';

import * as userController from '../controllers/users.controller';
import isAuthenticated from '../middlewares/auth.middleware';
import { requirements, validateRequest } from '../middlewares/validator';

const usersRouter = Router();

usersRouter.use(isAuthenticated);

usersRouter.get('/', userController.getAllUsers);

usersRouter
  .route('/:id')
  .get(validateRequest(requirements.getUser), userController.getUser)
  .patch(validateRequest(requirements.updateUser), userController.updateUser)
  .delete(validateRequest(requirements.deleteUser), userController.deleteUser);

export default usersRouter;
