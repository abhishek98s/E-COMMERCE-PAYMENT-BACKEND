import { Request, Response } from 'express';
import validator from 'validator';

import { addUser, getUserById } from './user.service';
import { userExceptionMessages } from './constant/userExceptionMessages';
import { userSucessMessages } from './constant/userSucessMessages';
import { customHttpError } from '../../utils/customHttpError';
import { StatusCodes } from 'http-status-codes';


export const getUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  if (!userId)
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      userExceptionMessages.INVALID_ID
    );

  const result = await getUserById(userId);

  return res.json({ success: true, data: result });
};


export const postUser = async (req: Request, res: Response) => {
  const { username, email, password, role, user } = req.body;

  if (!username || !email || !password) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      userExceptionMessages.USER_CREDENTIALS_REQUIRED
    );
  }

  if (
    !(
      validator.isEmail(email!) &&
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      })
    )
  ) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      userExceptionMessages.INVALID_EMAIL_PASS
    );
  }

  await addUser({
    username,
    email,
    password,
  });

  return res.json({ success: true, message: userSucessMessages.POST_SUCESS });
};
