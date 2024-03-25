import { Router } from 'express';

import listsControllers from '../controllers/lists';
import isAuthenticated from '../middlewares/auth.middleware';
import cardsRouter from './cards.router';

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

listsRouter.use('/:listId/cards', cardsRouter);

export default listsRouter;
