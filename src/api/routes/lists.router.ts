import { Router } from 'express';

import listsControllers from '../controllers/lists';
import isAuthenticated from '../middlewares/auth.middleware';

const listsRouter = Router({ mergeParams: true });

listsRouter.use(isAuthenticated);

listsRouter
  .route('/')
  .post(listsControllers.createList)
  .get(listsControllers.fetchListsByBoard);

listsRouter
  .route('/:listId')
  .patch(listsControllers.updateList)
  .delete(listsControllers.deleteList);

export default listsRouter;
