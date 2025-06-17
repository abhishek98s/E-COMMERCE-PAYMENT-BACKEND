import express from 'express';

import * as productController from './product.controller';

import { verifyToken } from '../../middleware/authentication.middleware';
const router = express.Router();

router.use(verifyToken);

router.route('/').get(productController.getAll);
router.route('/:product_id').get(productController.getByProductId);

export default router;
