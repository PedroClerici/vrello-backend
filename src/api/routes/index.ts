import { Router } from 'express';

import usersRoutes from './users';

const router = Router();

usersRoutes(router);

export default router;
