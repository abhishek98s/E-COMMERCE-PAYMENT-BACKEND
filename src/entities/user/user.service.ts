import bcrypt from 'bcrypt';

import { userExceptionMessages } from './constant/userExceptionMessages';
import * as UserDAO from './user.repository';
import { UserModel } from './user.model';
import { customHttpError } from '../../utils/customHttpError';
import { StatusCodes } from 'http-status-codes';
import { RegisterModel } from '../../auth/auth.model';

export const getUserById = async (userId: number) => {
  const user: UserModel = await UserDAO.fetchById(userId);

  if (!user)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.USER_NOT_FOUND
    );

  return user;
};

export const addUser = async (userInfo: RegisterModel) => {
  const { username, password, email } = userInfo;

  const existingUser = await UserDAO.fetchByEmail(email);

  if (existingUser) {
    throw new customHttpError(
      StatusCodes.CONFLICT,
      userExceptionMessages.EMAIL_EXITS
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserDAO.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!user)
    throw new customHttpError(
      StatusCodes.CONFLICT,
      userExceptionMessages.CREATE_FAILED
    );
};

export const updateUser = async (
  user_id: number,
  updatedUserInfo: UserModel
) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(updatedUserInfo.password, salt);

  const updatedUser = { ...updatedUserInfo, password: hashedPassword };
  const user = await UserDAO.update(updatedUser, user_id);

  if (!user)
    throw new customHttpError(
      StatusCodes.CONFLICT,
      userExceptionMessages.UPDATE_FAILED
    );

  return await UserDAO.fetchById(user_id);
};

export const removeUser = async (user_id: number) => {
  const currentUser = await getUserById(user_id);
  if (!currentUser)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.USER_NOT_FOUND
    );

  const user = await UserDAO.remove(user_id);
  if (!user)
    throw new customHttpError(
      StatusCodes.CONFLICT,
      userExceptionMessages.DELETE_FAILED
    );

  return currentUser;
};
