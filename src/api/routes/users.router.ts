import { Router } from 'express';

import usersControllers from '../controllers/users';
import isAuthenticated from '../middlewares/auth.middleware';
import boardsRouter from './boards.router';

const usersRouter = Router();

usersRouter.use(isAuthenticated);

usersRouter.route('/').get(usersControllers.getAllUsers);

usersRouter
  .route('/:userId')
  .get(usersControllers.getUser)
  .patch(usersControllers.updateUser)
  .delete(usersControllers.deleteUser);

usersRouter.use('/:userId/boards', boardsRouter);

export default usersRouter;
