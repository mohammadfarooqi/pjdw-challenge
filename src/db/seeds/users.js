const { v4: uuidv4 } = require('uuid');

const clear = async (knex) => {
  await knex('user').del();
};

const seed = async (knex) => {
  await clear(knex);

  await knex('user').insert({
    id: uuidv4(),
    firstName: 'Mohammad',
    lastName: 'Farooqi',
    email: 'mohammad@abc.com'
  });

  await knex('user').insert({
    id: uuidv4(),
    firstName: 'Albert',
    lastName: 'Einstein',
    email: 'albert@abc.com'
  });

  await knex('user').insert({
    id: uuidv4(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@abc.com'
  });

  await knex('user').insert({
    id: uuidv4(),
    firstName: 'Lalith',
    lastName: 'Goga',
    email: 'lalith@abc.com'
  });

  await knex('user').insert({
    id: uuidv4(),
    firstName: 'Super',
    lastName: 'Man',
    email: 'super@abc.com'
  });
};

module.exports = { clear, seed }