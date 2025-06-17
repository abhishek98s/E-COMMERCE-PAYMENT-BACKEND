import * as CartRepository from './cart.repository';
import * as UserRepository from '../user/user.repository';
import { customHttpError } from '../../utils/customHttpError';
import { StatusCodes } from 'http-status-codes';
import { userExceptionMessages } from '../user/constant/userExceptionMessages';
import { cartExceptionMessages } from './constant/cartExceptionMessages';

export const fetchAllByUserId = async (user_id: number) => {
  const user = await UserRepository.fetchById(user_id);

  if (!user) {
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.USER_NOT_FOUND
    );
  }

  const products = await CartRepository.fetchAll(user_id);
  return products;
};

export const clearCart = async (user_id: number) => {
  const user = await UserRepository.fetchById(user_id);

  if (!user) {
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.USER_NOT_FOUND
    );
  }


  await CartRepository.clearCart(user_id);
};

export const addToCart = async (
  user_id: number,
  product_id: number,
  quantity: number
) => {
  const user = await UserRepository.fetchById(user_id);

  if (!user) {
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.USER_NOT_FOUND
    );
  }

  const cart = await CartRepository.addToCart(user_id, product_id, quantity);
  return cart;
};

export const removeFromCart = async (user_id: number, product_id: number) => {
  const user = await UserRepository.fetchById(user_id);

  if (!user) {
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.USER_NOT_FOUND
    );
  }

  const isProductExistInCart = await CartRepository.fetchByProductId(
    product_id
  );

  if (!isProductExistInCart) {
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      cartExceptionMessages.CART_NOT_FOUND
    );
  }

  await CartRepository.removeFromCart(product_id, user_id);
};
