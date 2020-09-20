import jwt from 'jsonwebtoken';
import knex from '../db/knex';
import { AuthenticationError } from 'apollo-server-express';
import { APP_SECRET } from '../config';

export const issueToken = async ({ firstName, lastName, email, id }) => {
  let token = await jwt.sign({ firstName, lastName, email, id }, APP_SECRET, { expiresIn: '1d' });

  return {
    token
  };
};

export const getAuthUser = async (request, requiresAuth = false) => {
  const bearerHeader = request.headers['authorization'];
  
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    const tokenDecoded = await jwt.verify(token, APP_SECRET);
    // console.log('tokenDecoded', tokenDecoded);

    const user = await knex('user').where({ id: tokenDecoded.id }).select('*').first();

    if (!user) {
      throw new AuthenticationError('User does not exist');
    }

    if (requiresAuth) {
      return user;
    }

    return null;
  }
};