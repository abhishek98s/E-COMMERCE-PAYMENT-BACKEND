import { Request, Response } from 'express';
import * as CartServices from './cart.services';
import { StatusCodes } from 'http-status-codes';
import { cartSuccessMessages } from './constant/cartSuccessMessages';
import { customHttpError } from '../../utils/customHttpError';
import { cartExceptionMessages } from './constant/cartExceptionMessages';

export const getAll = async (req: Request, res: Response) => {
  const { user_id } = req.body.user;
  const cart = await CartServices.fetchAllByUserId(user_id);

  res.status(StatusCodes.OK).json({
    success: true,
    data: cart,
  });
};

export const clearCart = async (req: Request, res: Response) => {
  const { user_id } = req.body.user;

  await CartServices.clearCart(user_id);

  res.status(StatusCodes.OK).json({
    success: true,
    message: cartSuccessMessages.CART_CLEAR_SUCCESS,
  });
};

export const addToCart = async (req: Request, res: Response) => {
  const { user_id } = req.body.user;
  const { product_id, quantity } = req.body;

  await CartServices.addToCart(user_id, product_id, quantity);

  res.status(StatusCodes.OK).json({
    success: true,
    message: cartSuccessMessages.ADDED_TO_CART,
  });
};

export const deleteCart = async (req: Request, res: Response) => {
  const { user_id } = req.body.user;
  const product_id = parseInt(req.params.product_id);

  if (!product_id || isNaN(product_id)) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      cartExceptionMessages.CART_ID_REQUIRED
    );
  }

  await CartServices.removeFromCart(user_id, product_id);

  res.status(StatusCodes.OK).json({
    success: true,
    message: cartSuccessMessages.CART_DELETED,
  });
};
