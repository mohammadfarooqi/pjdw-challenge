// const { NODE_ENV } = require('../config');
// const path = require('path');
// const { DB_URL } = require('./src/config');
import path from 'path';
import { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_DEBUG } from './src/config';

export default {
  client: 'pg',
  connection: {
    host: DB_HOST || '127.0.0.1',
    port: DB_PORT || '5432',
    user: DB_USER || 'postgres',
    password: DB_PASS || 'password',
    database: DB_NAME || 'db',
  },
  migrations: {
    directory: path.join(__dirname, 'src', 'db', 'migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'db', 'seeds')
  },
  debug: DB_DEBUG == 'true'? true : false
};