import createCard from './create-card.controller';
import fetchCardsByList from './fetch-cards-by-list.controller';
import updateCard from './update-card.controller';
import deleteCard from './delete-card.controller';

const cardsControllers = {
  createCard,
  fetchCardsByList,
  updateCard,
  deleteCard,
};

export default cardsControllers;
