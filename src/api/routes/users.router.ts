import { Router } from 'express';

import * as userController from '../controllers/users.controller';
import isAuthenticated from '../middlewares/auth.middleware';

const usersRouter = Router();

usersRouter.use(isAuthenticated);

usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/:id', userController.getUser);
usersRouter.patch('/:id', userController.updateUser);
usersRouter.delete('/:id', userController.deleteUser);

export default usersRouter;
