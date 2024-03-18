import { Router } from 'express';

import boardsControllers from '../controllers/boards';
import isAuthenticated from '../middlewares/auth.middleware';

const boardsRouter = Router({ mergeParams: true });

boardsRouter.use(isAuthenticated);

boardsRouter
  .route('/')
  .post(boardsControllers.createBoard)
  .get(boardsControllers.fetchBoardsByAuthor);

export default boardsRouter;
