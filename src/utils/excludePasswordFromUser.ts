import User from '../users/interfaces/user.interface';
import { ReturnUser } from '../users/types/return-user.type';

export const excludePasswordFromUser = (user: User): ReturnUser => {
  const { password, ...rest } = user;
  return { ...rest };
};
