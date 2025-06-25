import * as ProductRepository from './product.repository';
import * as ProductDAO from './product.repository';
import { customHttpError } from '../../utils/customHttpError';
import { StatusCodes } from 'http-status-codes';
import { productExceptionMessages } from './constant/productExceptionMessages';
import { IProduct } from './product.model';
import { uploadToCloudinary } from '../../utils/cloudinary';

export const getAllProducts = async () => {
  const products = await ProductRepository.fetchAll();
  return products;
};

export const getProductsById = async (product_id: number) => {
  const products = await ProductRepository.fetchByProductId(product_id);
  return products;
};

export const postProduct = async (productData: IProduct) => {
  return await ProductDAO.create({ ...productData });
};
