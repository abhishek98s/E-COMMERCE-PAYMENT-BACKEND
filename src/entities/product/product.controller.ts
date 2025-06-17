import { Request, Response } from 'express';
import * as ProductServices from './product.services';
import { StatusCodes } from 'http-status-codes';
import { customHttpError } from '../../utils/customHttpError';
import { productExceptionMessages } from './constant/productExceptionMessages';

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
