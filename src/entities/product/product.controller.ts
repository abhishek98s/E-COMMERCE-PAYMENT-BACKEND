import { Request, Response } from 'express';
import * as ProductServices from './product.services';
import { StatusCodes } from 'http-status-codes';
import { customHttpError } from '../../utils/customHttpError';
import { productExceptionMessages } from './constant/productExceptionMessages';
import * as ProductService from './product.services';
import { productSuccessMessages } from './constant/productSuccessMessages';
import { IProduct, ITransaction, ITransactionProduct } from './product.model';

export const getAll = async (req: Request, res: Response) => {
  const products = await ProductServices.getAllProducts();

  res.status(StatusCodes.OK).json({
    success: true,
    data: products,
  });
};

export const getByProductId = async (req: Request, res: Response) => {
  const product_id = parseInt(req.params.product_id);

  if (!product_id || isNaN(product_id)) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      productExceptionMessages.PRODUCT_ID_REQUIRED
    );
  }

  const products = await ProductServices.getProductsById(product_id);

  res.status(StatusCodes.OK).json({
    success: true,
    data: products,
  });
};

export const postProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock_quantity, image_url, user } =
    req.body;

  const productData: IProduct = {
    name,
    description,
    price: parseInt(price),
    stock_quantity: parseInt(stock_quantity),
    image_url,
  };

  await ProductService.postProduct(productData);

  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: productSuccessMessages.POST_SUCCESS });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock_quantity, image_url, user } =
    req.body;
  const product_id = parseInt(req.params.product_id);

  if (!product_id || isNaN(product_id)) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      productExceptionMessages.PRODUCT_ID_REQUIRED
    );
  }

  const productData: IProduct = {
    product_id: product_id.toString(),
    name,
    description,
    price: parseInt(price),
    stock_quantity: parseInt(stock_quantity),
    image_url,
  };

  await ProductService.updateProduct(productData);

  return res
    .status(StatusCodes.OK)
    .json({ success: true, message: productSuccessMessages.UPDATE_SUCCESS });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product_id = parseInt(req.params.product_id);

  if (!product_id || isNaN(product_id)) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      productExceptionMessages.PRODUCT_ID_REQUIRED
    );
  }

  await ProductService.deleteProduct(product_id.toString());

  return res
    .status(StatusCodes.OK)
    .json({ success: true, message: productSuccessMessages.DELETE_SUCCESS });
};

export const postTransaction = async (req: Request, res: Response) => {
  const { transaction_id, products, user } = req.body;

  const total_amount = products.reduce((a: number, p: ITransactionProduct) => {
    return (a += p.price * p.quantity);
  }, 0);

  const transactionData: ITransaction = {
    transaction_id,
    total_amount,
    products,
  };

  const user_id: number = parseInt(user.user_id);

  await ProductService.addPayment(transactionData, user_id);

  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: productSuccessMessages.PAYMENT_SUCCESS });
};
