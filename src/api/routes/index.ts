import { Router } from 'express';

import usersRoutes from './users.routes';

const router = Router();

usersRoutes(router);

export default router;
