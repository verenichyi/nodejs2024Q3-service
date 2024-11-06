import User from '../interfaces/user.interface';

export type ReturnUser = Omit<User, 'password'>;
