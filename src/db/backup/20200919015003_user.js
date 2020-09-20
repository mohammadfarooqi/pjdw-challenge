exports.up = (knex) => {
  return knex.schema.alterTable('user', (user) => {
    user.uuid('product_id').references('product.id').onDelete('CASCADE');
    user.unique(['product_id', 'id']);
  });
}
exports.down = (knex) => {
  return knex.schema.alterTable('user', (user) => {
    user.dropUnique(['product_id', 'id']);
    user.dropForeign('product_id');
    user.dropColumn('product_id');
  });
}