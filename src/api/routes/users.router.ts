import { Router } from 'express';

import usersControllers from '../controllers/users';
import isAuthenticated from '../middlewares/auth.middleware';

const usersRouter = Router();

usersRouter.use(isAuthenticated);

usersRouter.route('/').get(usersControllers.getAllUsers);

usersRouter
  .route('/:id')
  .get(usersControllers.getUser)
  .patch(usersControllers.updateUser)
  .delete(usersControllers.deleteUser);

export default usersRouter;
