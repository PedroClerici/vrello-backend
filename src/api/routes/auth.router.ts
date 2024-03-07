import { Router } from 'express';

import authControllers from '../controllers/auth';
import isAuthenticated from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.route('/register').post(authControllers.register);

authRouter.route('/login').post(authControllers.login);

authRouter.route('/profile').get(isAuthenticated, authControllers.profile);
authRouter.route('/refresh').post(authControllers.refresh);

export default authRouter;
