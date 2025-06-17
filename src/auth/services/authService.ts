import { StatusCodes } from 'http-status-codes';

import knex from '../../config/knex.config';
import { UserModel } from '../../entities/user/user.model';
import { addUser } from '../../entities/user/user.service';
import { customHttpError } from '../../utils/customHttpError';
import { authExceptionMessages } from '../constant/authExceptionMessages';
import { RegisterModel } from '../auth.model';
import * as userServices from '../../entities/user/user.repository';

export const findUserByEmail = async (email: string) => {
  const user = await userServices.fetchByEmail(email);

  if (!user)
    throw new customHttpError(
      StatusCodes.UNAUTHORIZED,
      authExceptionMessages.USER_NOT_FOUND
    );

  return user;
};

export const register = async (userData: RegisterModel) => {
  return await addUser(userData);
};
