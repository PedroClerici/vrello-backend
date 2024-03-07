import { Router } from 'express';

import authControllers from '../controllers/auth';
import isAuthenticated from '../middlewares/auth.middleware';
import { validateRequest, requirements } from '../middlewares/validator';

const authRouter = Router();

authRouter
  .route('/register')
  .post(validateRequest(requirements.register), authControllers.register);

authRouter
  .route('/login')
  .post(validateRequest(requirements.login), authControllers.login);

authRouter.route('/profile').get(isAuthenticated, authControllers.profile);
authRouter.route('/refresh').post(authControllers.refresh);

export default authRouter;
