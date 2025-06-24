import express from 'express';
import multer from 'multer';

import { getUser, postUser } from './user.controller';
import { verifyToken } from '../../middleware/authentication.middleware';
import joiValidationMiddleware from '../../middleware/joiValidationMiddleware';
import userSchema, { patchUserSchema } from './user.schema';
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(verifyToken);

router.post(
  '/',
  upload.single('e_com_image'),
  joiValidationMiddleware(userSchema),
  postUser
);
router
  .get('/:id', getUser);

export default router;
