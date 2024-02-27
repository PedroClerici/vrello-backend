import authRequirements from './auth.requirements';
import userRequirements from './users.requirements';

export default {
  ...authRequirements,
  ...userRequirements,
};
