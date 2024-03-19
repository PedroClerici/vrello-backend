import createBoard from './create-board.controller';
import fetchBoardsByAuthor from './fetch-boards-by-author.controller';
import updateBoard from './update-board.controller';
import deleteBoard from './delete-board.controller';

const boardsControllers = {
  createBoard,
  fetchBoardsByAuthor,
  updateBoard,
  deleteBoard,
};

export default boardsControllers;
