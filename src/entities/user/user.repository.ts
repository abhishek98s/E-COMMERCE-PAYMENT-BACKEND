import { RegisterModel } from '../../auth/auth.model';
import knex from '../../config/knex.config';
import { UserModel } from './user.model';

export const fetchById = async (userId: number) => {
  return await knex('users')
    .select('user_id', 'username', 'email')
    .where({ user_id: userId })
    .first();
};

export const fetchByEmail = async (email: string) => {
  return await knex('users')
    .select('user_id', 'username', 'email', 'password')
    .where('email', email)
    .first();
};

export const create = async (userData: UserModel) => {
  const user = await knex('users').insert(userData).returning('user_id');
  return { user_id: user[0].user_id };
};

export const update = async (userData: UserModel, userId: number) => {
  return await knex('users')
    .select('*')
    .where('user_id', userId)
    .update(userData);
};

export const remove = async (userId: number) => {
  return await knex('users').where('user_id', userId).del();
};
