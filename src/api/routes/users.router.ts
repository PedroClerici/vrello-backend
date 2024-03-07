import { Router } from 'express';

import usersControllers from '../controllers/users';
import isAuthenticated from '../middlewares/auth.middleware';
import { requirements, validateRequest } from '../middlewares/validator';

const usersRouter = Router();

usersRouter.use(isAuthenticated);

usersRouter.route('/').get(usersControllers.getAllUsers);

usersRouter
  .route('/:id')
  .get(validateRequest(requirements.getUser), usersControllers.getUser)
  .patch(validateRequest(requirements.updateUser), usersControllers.updateUser)
  .delete(
    validateRequest(requirements.deleteUser),
    usersControllers.deleteUser,
  );

export default usersRouter;
