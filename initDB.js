// const path = require('path');
import path from 'path';

async function createDatabase() {
  const config = require(path.join(__dirname, 'knexfile')).default;
  // console.log(config);
  config.connection.database = null;
  const knex = require('knex')(config);

  try {
    await knex.raw('CREATE DATABASE pjdw');
  } catch (error) {
    await knex.destroy();
    console.info(error.message);
    process.exit(0);
  }

  await knex.destroy();
  console.log('Done Creating DB');
  process.exit(0);
}

createDatabase();