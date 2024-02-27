import { Router } from 'express';

import * as authController from '../controllers/auth.controller';
import isAuthenticated from '../middlewares/auth.middleware';
import { validateRequest, requirements } from '../middlewares/validator';

const authRouter = Router();

authRouter
  .route('/register')
  .post(validateRequest(requirements.register), authController.register);

authRouter
  .route('/login')
  .post(validateRequest(requirements.login), authController.login);

authRouter.route('/profile').get(isAuthenticated, authController.profile);
authRouter.route('/refresh').post(authController.refresh);

export default authRouter;
