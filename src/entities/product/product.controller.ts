import { Request, Response } from 'express';
import * as ProductServices from './product.services';
import { StatusCodes } from 'http-status-codes';
import { customHttpError } from '../../utils/customHttpError';
import { productExceptionMessages } from './constant/productExceptionMessages';
import * as ProductService from './product.services';
import { productSuccessMessages } from './constant/productSuccessMessages';

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
  const { name, description, price, stock_quantity, user } = req.body;

  const productData: IProduct = {
    name,
    description,
    price: parseInt(price),
    stock_quantity: parseInt(stock_quantity),
    created_by: user.username,
  };

  if (!req.file) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      productExceptionMessages.IMAGE_REQUIRED
    );
  }

  const imagePath = req.file!.path;
  const imageName = req.file!.originalname;

  await ProductService.postProduct(
    productData,
    user.username,
    imagePath,
    imageName
  );

  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: productSuccessMessages.POST_SUCCESS });
};
