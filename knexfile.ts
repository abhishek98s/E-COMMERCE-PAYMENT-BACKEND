// knexfile.ts
import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg', // Change this to your database client
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'root',
      database: 'E_COM',
    },
  },
  // You can add more environments (e.g., production, testing) here
};

export default config;
