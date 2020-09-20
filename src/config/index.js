require('dotenv').config();

export const {
  PORT,
  NODE_ENV,
  APP_SECRET,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_PORT,
  DB_URL,
  DB_DEBUG
} = process.env;

export const IN_PROD = NODE_ENV == 'production';
