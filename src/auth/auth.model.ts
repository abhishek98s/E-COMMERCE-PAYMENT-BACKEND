import { UserModel } from '../entities/user/user.model';

export type RegisterModel = Pick<UserModel, 'username' | 'email' | 'password'>;
