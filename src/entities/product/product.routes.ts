import express from 'express';

import * as ProductController from './product.controller';

import { verifyToken } from '../../middleware/authentication.middleware';
import multer from 'multer';
import joiValidationMiddleware from '../../middleware/joiValidationMiddleware';
import { productSchema, transactionSchema } from './product.schema';
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router
  .route('/')
  .get(ProductController.getAll)
  .post(
    verifyToken,
    joiValidationMiddleware(productSchema),
    ProductController.postProduct
  );
router
  .route('/payment/product')
  .post(
    verifyToken,
    joiValidationMiddleware(transactionSchema),
    ProductController.postTransaction
  );
router.route('/:product_id').get(ProductController.getByProductId);
router.route('/:product_id').put(ProductController.updateProduct);
router.route('/:product_id').delete(ProductController.deleteProduct);
export default router;

const obj = {
  transaction_id: '123',
  amount: 350,
  products: [
    {
      product_id: '1',
      quantity: 3,
      price: 100,
    },
    {
      product_id: '2',
      quantity: 1,
      price: 50,
    },
  ],

  user_id: '123',
};
