import { Router } from 'express';

import * as authController from '../controllers/auth.controller';
import isAuthenticated from '../middlewares/auth.middleware';
import validateResource from '../middlewares/validate-resource.middleware';
import { registerSchema } from '../schemas/auth.schemas';

const authRouter = Router();

authRouter.post(
  '/register',
  validateResource(registerSchema),
  authController.register,
);
authRouter.post('/login', authController.login);
authRouter.get('/profile', isAuthenticated, authController.profile);
authRouter.post('/refresh', authController.refresh);

export default authRouter;
