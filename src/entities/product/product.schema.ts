import Joi, { Schema } from 'joi';
import { authJWTSchema } from '../../auth/schema/auth.schema';

export const productSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'any.required': 'Name is required.',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be a string.',
    'string.empty': 'Description cannot be empty.',
    'any.required': 'Description is required.',
  }),
  price: Joi.number().required().messages({
    'number.base': 'Price must be a number.',
    'any.required': 'Price is required.',
  }),
  stock_quantity: Joi.number().required().messages({
    'number.base': 'Stock quantity must be a number.',
    'any.required': 'Stock quantity is required.',
  }),
  ...authJWTSchema,
});
