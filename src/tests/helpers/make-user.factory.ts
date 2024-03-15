import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';

import { User } from '@/api/models/users.model';

const makeUser = (override: Partial<User> = {}): User => {
  const user: User = {
    id: new Types.ObjectId(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...override,
  };

  return user;
};

export default makeUser;
