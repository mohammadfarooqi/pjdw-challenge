import knex from '../../db/knex';
import Joi from '@hapi/joi';
import { issueToken, getAuthUser } from '../../functions/auth';
import { loginValidate, addProductToUserValidate } from '../validators';

export default {
  Query: {
    users: async (root, args, { req }, info) => {
      await getAuthUser(req);
      const query = await knex('user').select('*');

      // console.log('q', query);
      return query;
    },
    login: async (root, args, { req }, info) => {
      await Joi.assert(args, loginValidate, { abortEarly: true });

      let user = await knex('user').where({ email: args['email'] }).select('*').first();
      // console.log('user', user);
      
      if (!user) {
        throw new Error('Email not found');
      }

      let token = await issueToken(user);
      
      return {
        user,
        ...token
      }
    }
  },
  Mutation: {
    addProductToUser: async (root, args, { req }, info) => {
      // addProductToUser(id: ID!): InsertResponse!

      const user = await getAuthUser(req, true);
      
      await Joi.assert(args, addProductToUserValidate, { abortEarly: true });

      if (!user) {
        throw new Error('No user found');
      }

      let message;
      let success;

      const [test] = await knex('users_products').where({ user_id: user.id, product_id: args.id }).returning('*');
      // console.log('q1', test);

      if (test) {
        message = 'Product already exists for User';
        success = false;
      } else {
        const [query] = await knex('users_products').insert({ user_id: user.id, product_id: args.id }).returning('*');
        // console.log('q2', query);

        success = query ? true : false,
        message = null;        
      }

      return {
        success,
        message
      };
    },
    removeProductFromUser: async (root, args, { req }, info) => {
      // removeProductFromUser(productId: ID!): DeleteResponse

      const user = await getAuthUser(req, true);
      
      await Joi.assert(args, addProductToUserValidate, { abortEarly: true });

      if (!user) {
        throw new Error('No user found');
      }

      let message;
      let success;

      const [test] = await knex('users_products').where({ user_id: user.id, product_id: args.id }).returning('*');
      // console.log('q1', test);

      if (!test) {
        message = 'Product does not exist for User';
        success = false;
      } else {
        const [query] = await knex('users_products').where({ user_id: user.id, product_id: args.id }).del().returning('*');
        // console.log('q2', query);

        success = query ? true : false,
        message = null;
      }

      return {
        success,
        message
      };
    },
    getAllProductsForUser: async (root, args, { req }, info) => {
      // getAllProductsForUser: [Product!]!

      const user = await getAuthUser(req, true);
      
      // const query = await knex({
      //   a: 'users_products',
      //   b: 'user',
      //   c: 'product'
      // })
      //   .join('user', 'a.user_id', '=', 'b.id')
      //   .join('product', 'a.product_id', '=', 'c.id')
      //   .where({ user_id: user.id }).returning('*');


      const query = await knex.select(
          // 'u.id as user_id', 
          // 'u.firstName as user_firstName', 
          // 'u.lastName as user_lastName', 
          // 'u.email as user_email', 
          // 'p.id as product_id', 
          // 'p.name as product_name', 
          // 'p.description as product_description', 
          // 'p.price as product_price', 
          // 'p.image as product_image'
          'p.*'
        )
        .from({ up: 'users_products' })
        .innerJoin({ u: 'user' }, 'up.user_id', '=', 'u.id')
        .innerJoin({ p: 'product' }, 'up.product_id', '=', 'p.id')
        .where({ user_id: user.id }).returning('*');

      // console.log('q2', query);

      return query.map(i => {
        if (i.image) {
          i.image = i.image.toString('utf8');
        }
        return i;
      });
    },
  }
};