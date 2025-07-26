import { Knex } from 'knex';

exports.seed = async function (knex: Knex) {
  await knex('users').del();
  await knex('users').insert([
    {
      username: 'Admin User',
      email: 'admin@example.com',
      password: '$2b$10$Bt3wX8H4n/zHopXRui6dgu9SmE3tWfHmN4err6pFFCtpYsJiR091a', // placeholder hash
      role_id: 1,
    },
    {
      username: 'Regular User',
      email: 'user@example.com',
      password: '$2a$10$examplehashuser', // placeholder hash
      role_id: 2,
    },
  ]);
};
