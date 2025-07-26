import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, register } from '../services/authService';
import { authExceptionMessages } from '../constant/authExceptionMessages';
import { authSuccessMessages } from '../constant/authSuccessMessages';
import { customHttpError } from '../../utils/customHttpError';
import { StatusCodes } from 'http-status-codes';
import { config } from '../../config/config';

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      authExceptionMessages.EMAIL_PASS_REQUIRED
    );
  }

  const user = await findUserByEmail(email);

  const { username, user_id, email: dB_email, password: db_password, role } = user;

  const passordMatched: boolean = await bcrypt.compare(password, db_password);

  if (!passordMatched) {
    throw new customHttpError(
      StatusCodes.UNAUTHORIZED,
      authExceptionMessages.INVALID_CREDENTIALS
    );
  }
  const token = jwt.sign(
    { username, user_id, email: dB_email },
    config.jwt.ACCESS_TOKEN_SECRET
  );

  res.status(StatusCodes.OK).json({
    success: true,
    data: token,
    user: { username, email, role },
    message: authSuccessMessages.LOGIN_SUCCESS,
  });
};

export const registerHandler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const savedUser = await register({
    username,
    email,
    password,
  });

  res.json({
    success: true,
    data: savedUser,
    message: authSuccessMessages.REGISTER_SUCCESS,
  });
};
