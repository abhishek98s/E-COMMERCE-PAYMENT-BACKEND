import joi, { Schema } from 'joi';
import { authJWTSchema } from '../../auth/schema/auth.schema';
import { productExceptionMessages } from '../product/constant/productExceptionMessages';

export const addCartSchema: Schema = joi.object().keys({
  product_id: joi.number().required().messages({
    'number.base': productExceptionMessages.PRODUCT_ID_NUMBER,
    'any.required': productExceptionMessages.PRODUCT_ID_REQUIRED,
    'number.empty': productExceptionMessages.PRODUCT_ID_REQUIRED,
  }),
  quantity: joi.number().required().messages({
    'number.base': productExceptionMessages.QUANTITY_NUMBER,
    'any.required': productExceptionMessages.QUANTITY_REQUIRED,
    'number.empty': productExceptionMessages.QUANTITY_REQUIRED,
  }),
  ...authJWTSchema,
});
