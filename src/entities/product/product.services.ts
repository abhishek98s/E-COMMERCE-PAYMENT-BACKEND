import * as ProductRepository from './product.repository';
import * as ProductDAO from './product.repository';
import { customHttpError } from '../../utils/customHttpError';
import { StatusCodes } from 'http-status-codes';
import { productExceptionMessages } from './constant/productExceptionMessages';

export const getAllProducts = async () => {
  const products = await ProductRepository.fetchAll();
  return products;
};

export const getProductsById = async (product_id: number) => {
  const products = await ProductRepository.fetchByProductId(product_id);
  return products;
};

export const postProduct = async (
  productData: IProduct,
  username: string,
  imagePath: string,
  imageName: string
) => {

  const product = await ProductDAO.create({ ...productData });

  if (!product.productId)
    throw new customHttpError(
      StatusCodes.REQUEST_TOO_LONG,
      productExceptionMessages.POST_FAILED
    );

  return;
};
