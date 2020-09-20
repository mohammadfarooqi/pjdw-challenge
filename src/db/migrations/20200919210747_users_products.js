exports.up = (knex) => {
  return knex.schema.createTable('users_products', (users_products) => {
    users_products.uuid('product_id').references('id').inTable('product').onDelete('CASCADE');
    users_products.uuid('user_id').references('id').inTable('user').onDelete('CASCADE');
    // users_products.unique(['product_id', 'user_id']);
    users_products.primary(['product_id', 'user_id']);
  });
}
exports.down = (knex) => {
  return knex.schema.dropTable('users_products');
}