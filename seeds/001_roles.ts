import { Knex } from 'knex';

exports.seed = async function (knex: Knex) {
  await knex('roles').del();
  await knex('roles').insert([{ role_name: 'admin' }, { role_name: 'user' }]);
};
