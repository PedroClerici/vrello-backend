import { type User } from '@/api/models/users.model';

declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>;
    }
  }
}
