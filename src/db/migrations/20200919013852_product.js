exports.up = (knex) => {
  return knex.schema.createTable('product', product => {
    product
      .uuid('id')
      .notNullable()
      .primary();
    product
      .string('name', 255)
      .notNullable();
    product
      .string('description', 255)
      .notNullable();
    product
      .decimal('price')
      .notNullable();
    product
      .binary('image');
  })
}
exports.down = (knex) => {
  return knex.schema.dropTable('product');
}