import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('paymentDetails');

  if (!exists) {
    await knex.schema.createTable('paymentDetails', function (table) {
      table.increments('payment_detail_id').primary(); // Primary key
      table
        .integer('payment_id')
        .unsigned()
        .notNullable() // Foreign key
        .references('payment_id')
        .inTable('payments')
        .onDelete('CASCADE'); // Delete details if payment is deleted
      table
        .integer('product_id')
        .unsigned()
        .notNullable() // Foreign key referencing product table
        .references('product_id')
        .inTable('products') // Assuming the product table is named 'products'
        .onDelete('CASCADE'); // Optional: delete payment details if product is deleted
      table
        .integer('user_id')
        .unsigned()
        .notNullable() // Foreign key referencing users table
        .references('user_id')
        .inTable('users') // Assuming the users table is named 'users'
        .onDelete('CASCADE'); // Optional: delete payment details if user is deleted
      table.integer('quantity').notNullable(); // Quantity of the product
      table.decimal('price', 10, 2).notNullable(); // Price of the product
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Created timestamp
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // Updated timestamp
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('paymentDetails');

  if (exists) {
    await knex.schema.dropTable('paymentDetails');
  }
}
