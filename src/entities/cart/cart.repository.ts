import knex from '../../config/knex.config';

export const fetchByProductId = (product_id: number) => {
  return knex('cart_items').where({ product_id });
};

export const fetchAll = (userId: number) => {
  return knex('carts')
    .select(
      'products.product_id',
      'products.name',
      'products.price',
      'images.url',
      'images.alt_text',
      'cart_items.quantity'
    )
    .leftJoin('cart_items', 'carts.cart_id', 'cart_items.cart_id')
    .leftJoin('products', 'cart_items.product_id', 'products.product_id')
    .leftJoin('images', 'products.product_id', 'images.product_id')
    .where('carts.user_id', userId)
    .andWhere('images.is_primary', true);
};

export const addToCart = async (
  user_id: number,
  product_id: number,
  quantity: number
) => {
  // Check if cart exists for user
  let cart = await knex('carts').where({ user_id }).first();

  if (!cart) {
    // Create cart if not exists
    const [cart_id] = await knex('carts')
      .insert({ user_id })
      .returning('cart_id');
    cart = { cart_id, user_id };
  }

  // Check if product already in cart_items
  const cartItem = await knex('cart_items')
    .where({ cart_id: cart.cart_id, product_id })
    .first();

  if (cartItem) {
    // Update quantity if exists
    await knex('cart_items')
      .where({ cart_id: cart.cart_id, product_id })
      .update({ quantity: cartItem.quantity + quantity });
  } else {
    // Insert new cart item
    await knex('cart_items').insert({
      cart_id: cart.cart_id,
      product_id,
      quantity,
    });
  }
};

export const removeFromCart = async (product_id: number, user_id: number) => {
  const cart = await knex('carts').where({ user_id }).returning('cart_id');
  await knex('cart_items')
    .where({ product_id, cart_id: cart[0].cart_id })
    .del();
};

export const clearCart = async (user_id: number) => {
  await knex('cart_items')
    .whereIn('cart_id', knex('carts').select('cart_id').where({ user_id }))
    .del();
};
