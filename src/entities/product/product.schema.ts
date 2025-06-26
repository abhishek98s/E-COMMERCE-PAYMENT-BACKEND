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
  image_url: Joi.string().required().messages({
    'string.base': 'image_url must be a string.',
    'string.empty': 'image_url cannot be empty.',
    'any.required': 'image_url is required.',
  }),
  ...authJWTSchema,
});

export const transactionSchema = Joi.object().keys({
  transaction_id: Joi.string().required().messages({
    'string.base': 'Transaction ID must be a string.',
    'string.empty': 'Transaction ID cannot be empty.',
    'any.required': 'Transaction ID is required.',
  }),
  products: Joi.array()
    .items(
      Joi.object().keys({
        product_id: Joi.number().required().messages({
          'string.base': 'Product ID must be a number.',
          'string.empty': 'Product ID cannot be empty.',
          'any.required': 'Product ID is required.',
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          'number.base': 'Quantity must be a number.',
          'number.integer': 'Quantity must be an integer.',
          'number.min': 'Quantity must be at least 1.',
          'any.required': 'Quantity is required.',
        }),
        price: Joi.number().required().messages({
          'number.base': 'Price must be a number.',
          'any.required': 'Price is required.',
        }),
      })
    )
    .required()
    .messages({
      'array.base': 'Products must be an array.',
      'any.required': 'Products are required.',
    }),
  ...authJWTSchema, // Include JWT schema if needed
});
