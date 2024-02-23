import { Router } from 'express';

import * as authController from '../controllers/auth.controller';
import isAuthenticated from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/profile', isAuthenticated, authController.profile);

export default authRouter;
