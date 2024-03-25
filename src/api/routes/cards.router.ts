import { Router } from 'express';

import cardsControllers from '../controllers/cards';
import isAuthenticated from '../middlewares/auth.middleware';

const cardsRouter = Router({ mergeParams: true });

cardsRouter.use(isAuthenticated);

cardsRouter
  .route('/')
  .post(cardsControllers.createCard)
  .get(cardsControllers.fetchCardsByList);

cardsRouter
  .route('/:cardId')
  .patch(cardsControllers.updateCard)
  .delete(cardsControllers.deleteCard);

export default cardsRouter;
