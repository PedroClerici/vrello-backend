import getUser from './get-user.controller';
import getAllUsers from './get-all-users.controller';
import updateUser from './update-user.controller';
import deleteUser from './delete-user.controller';

const usersControllers = {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};

export default usersControllers;
