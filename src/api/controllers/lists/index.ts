import createList from './create-list.controller';
import fetchListsByBoard from './fetch-lists-by-board.controller';
import updateList from './update-list.controller';
import deleteList from './delete-list.controller';

const listsControllers = {
  createList,
  fetchListsByBoard,
  updateList,
  deleteList,
};

export default listsControllers;
