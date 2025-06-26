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
  return products;
};

export const getProductsById = async (product_id: number) => {
  const products = await ProductRepository.fetchByProductId(product_id);
  return products;
};

export const postProduct = async (productData: IProduct) => {
  return await ProductDAO.create({ ...productData });
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
