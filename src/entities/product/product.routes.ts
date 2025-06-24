import express from 'express';

import * as ProductController from './product.controller';

import { verifyToken } from '../../middleware/authentication.middleware';
import multer from 'multer';
import joiValidationMiddleware from '../../middleware/joiValidationMiddleware';
import { productSchema } from './product.schema';
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router
  .route('/')
  .get(ProductController.getAll)
  .post(
    upload.single('shop_co_image'),
    verifyToken,
    joiValidationMiddleware(productSchema),
    ProductController.postProduct
  );
router.route('/:product_id').get(ProductController.getByProductId);

export default router;
