import express from 'express';

import * as cartController from './cart.controller';

import { verifyToken } from '../../middleware/authentication.middleware';
import joiValidationMiddleware from '../../middleware/joiValidationMiddleware';
import { addCartSchema } from './cart.schema';
const router = express.Router();

router.use(verifyToken);

router
  .route('/')
  .get(cartController.getAll)
  .post(joiValidationMiddleware(addCartSchema), cartController.addToCart);
router.route('/clear').delete(cartController.clearCart);
router.route('/:product_id').delete(cartController.deleteCart);

export default router;
