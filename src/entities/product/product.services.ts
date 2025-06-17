import * as ProductRepository from './product.repository';

export const getAllProducts = async () => {
  const products = await ProductRepository.fetchAll();
  return products;
};

export const getProductsById = async (product_id: number) => {
  const products = await ProductRepository.fetchByProductId(product_id);
  return products;
};
