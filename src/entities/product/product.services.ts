import * as ProductRepository from './product.repository';
import * as ProductDAO from './product.repository';
import { customHttpError } from '../../utils/customHttpError';
import { StatusCodes } from 'http-status-codes';
import { productExceptionMessages } from './constant/productExceptionMessages';
import {
  IProduct,
  ITransaction,
  ITransactionProduct,
  TPayment,
  TPaymentDetail,
} from './product.model';
import { uploadToCloudinary } from '../../utils/cloudinary';

export const getAllProducts = async () => {
  const products = await ProductRepository.fetchAll();
  return products.map((product) => ({
    ...product,
    category: 'cloth',
    rating: {
      rate: 0,
      count: 0,
    },
  }));
};

export const getProductsById = async (product_id: number) => {
  const product = await ProductRepository.fetchByProductId(product_id);
  return {
    ...product,
    category: 'cloth',
    rating: {
      rate: 0,
      count: 0,
    },
  };
};

export const postProduct = async (productData: IProduct) => {
  return await ProductDAO.create({ ...productData });
};

export const updateProduct = async (productData: IProduct) => {
  const { product_id } = productData;

  if (!product_id || isNaN(parseInt(product_id))) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      productExceptionMessages.PRODUCT_ID_REQUIRED
    );
  }

  const product = await ProductRepository.fetchByProductId(parseInt(product_id));

  if (!product) {
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      productExceptionMessages.PRODUCT_NOT_FOUND
    );
  }

  const updateProductData: IProduct = {
    product_id: product_id.toString(),
    name: productData.name || product.name,
    description: productData.description || product.description,
    price: productData.price || product.price,
    image_url: productData.image_url || product.image_url,
    stock_quantity: productData.stock_quantity || product.stock_quantity,
  };

  return await ProductDAO.updateProduct(updateProductData);
};

export const deleteProduct = async (product_id: string) => {

  if (!product_id || isNaN(parseInt(product_id))) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      productExceptionMessages.PRODUCT_ID_REQUIRED
    );
  }

  const product = await ProductRepository.fetchByProductId(parseInt(product_id));

  if (!product) {
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      productExceptionMessages.PRODUCT_NOT_FOUND
    );
  }

  return await ProductDAO.deleteProduct(parseInt(product_id));
};

export const addPayment = async (
  productData: ITransaction,
  user_id: number
) => {
  const { products, total_amount, transaction_id } = productData;
  const payment: TPayment = {
    transaction_id,
    amount: total_amount,
    user_id,
  };

  const payment_id = await ProductDAO.createPayment(payment);

  const product = products.map(async (product: ITransactionProduct) => {
    const { price, product_id, quantity } = product;
    const paymentDetail: TPaymentDetail = {
      payment_id,
      user_id,
      price,
      product_id,
      quantity,
    };
    return ProductDAO.createPaymentDetail(paymentDetail);
  });

  await Promise.all(product);
};
