exports.up = (knex) => {
  return knex.schema.createTable('user', user => {
    user
      .uuid('id')
      .notNullable()
      .primary();
    user
      .string('firstName', 255)
      .notNullable();
    user
      .string('lastName', 255)
      .notNullable();
    user
      .string('email')
      .notNullable()
      .unique();
  })
}
exports.down = (knex) => {
  return knex.schema.dropTable('user');
}