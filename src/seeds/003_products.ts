import { Knex } from 'knex';

exports.seed = async function (knex: Knex) {
  // Delete existing entries
  await knex('products').del();

  // Insert new dummy data
  await knex('products').insert([
    {
      name: 'Wireless Headphones',
      description: 'Noise-canceling over-ear headphones.',
      price: 99.99,
      stock_quantity: 50,
      image_url:
        'https://img.drz.lazcdn.com/static/np/p/35794e239d0a32e62ae68781f3925dc8.jpg_720x720q80.jpg',
    },
    {
      name: 'Smartphone',
      description: 'Latest model smartphone with great camera.',
      price: 699.99,
      stock_quantity: 20,
      image_url:
        'https://www.telegraph.co.uk/content/dam/recommended/2025/05/20/TELEMMGLPICT000425244583_17477562398800_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpeg?imwidth=640',
    },
    {
      name: 'Laptop',
      description: 'Lightweight laptop with 16GB RAM and SSD.',
      price: 1199.99,
      stock_quantity: 10,
      image_url:
        'https://pyxis.nymag.com/v1/imgs/c74/0b3/1c74372712c9ec655ac6b6b191eaabf118.rsquare.w600.jpg',
    },
    {
      name: 'Smartwatch',
      description: 'Fitness tracking smartwatch with heart rate monitor.',
      price: 199.99,
      stock_quantity: 30,
      image_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_GO_7EWB0xm-pch7GGr9j-s5Yw0fDlvf1w&s',
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with deep bass.',
      price: 49.99,
      stock_quantity: 100,
      image_url:
        'https://audioshopnepal.com/wp-content/uploads/2023/05/FLIP6-BLK-dd.jpg',
    },
    {
      name: 'Gaming Mouse',
      description: 'High precision gaming mouse with customizable buttons.',
      price: 59.99,
      stock_quantity: 40,
      image_url:
        'https://static-01.daraz.com.np/p/3cfd7c23b05f79545a80318e45044058.jpg',
    },
    {
      name: '4K Monitor',
      description: 'Ultra HD 4K monitor for gaming and productivity.',
      price: 399.99,
      stock_quantity: 15,
      image_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6PhzL3jNZp_62adV-FUAU2_dCowFxP0vwg&s',
    },
    {
      name: 'Wireless Charger',
      description: 'Fast wireless charger for smartphones.',
      price: 29.99,
      stock_quantity: 80,
      image_url:
        'https://bestdealsnepal.com.np/wp-content/uploads/2023/08/ugreen-80537-15w-wireless-charger1.jpg',
    },
    {
      name: 'Action Camera',
      description: 'Compact action camera for adventure enthusiasts.',
      price: 299.99,
      stock_quantity: 25,
      image_url: 'https://www.neostore.com.np/assets/uploads/ace1.jpg',
    },
    {
      name: 'VR Headset',
      description: 'Virtual reality headset for immersive gaming.',
      price: 399.99,
      stock_quantity: 12,
      image_url:
        'https://www.thelittlelearnerstoys.com/cdn/shop/files/Interactive-VR-Headset-for-Kids_600x.jpg?v=1725608444',
    },
    {
      name: 'Portable SSD',
      description: 'Fast portable SSD for data storage.',
      price: 129.99,
      stock_quantity: 60,
      image_url:
        'https://gadgethousenepal.com/wp-content/uploads/2024/02/81JuwfFBiS._SL1500_.jpg',
    },
    {
      name: 'Electric Toothbrush',
      description: 'Rechargeable electric toothbrush with timer.',
      price: 79.99,
      stock_quantity: 70,
      image_url:
        'https://images-cdn.ubuy.qa/67c224ff13732f0c3661a3b6-oral-b-pro-1000-rechargeable-electric.jpg',
    },
  ]);
};
