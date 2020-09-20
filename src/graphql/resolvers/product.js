import knex from '../../db/knex';
import Joi from '@hapi/joi';
import { issueToken, getAuthUser } from '../../functions/auth';
import { getProductValidate, insertProductValidate, updateProductValidate, deleteProductValidate, uploadProductImageValidate } from '../validators';
import { v4 as uuidv4 } from 'uuid';

export default {
  Query: {
    getProduct: async (root, args, { req }, info) => {
      // getProduct(id: ID!): Product!
      await getAuthUser(req);

      await Joi.assert(args, getProductValidate, { abortEarly: true });

      const query = await knex('product').where({ id: args.id }).select('*').first();
      // console.log('q', query);

      if (!query) {
        throw new Error(`Product with Id '${args.id}' does not exist`);
      }
      
      if (query.image) {
        query.image = query.image.toString('utf8');
      }
      
      return query;
    },
    getAllProducts: async (root, args, { req }, info) => {
      // getAllProducts: [Product!]!

      await getAuthUser(req);

      let query = await knex('product').select('*');
      // console.log('q', query);

      if (query && Array.isArray(query) && query.length > 0) {
        query = query.map((product) => {
          if (product.image) {
            product.image = product.image.toString('utf8');
          }
          return product;
        });
      }
      
      return query;
    }
  },
  Mutation: {
    insertProduct: async (root, args, { req }, info) => {
      // insertProduct(
      //   name: String!
      //   description: String!
      //   price: Float!
      // ): Product!

      await getAuthUser(req);

      await Joi.assert(args, insertProductValidate, { abortEarly: true });

      const [query] = await knex('product').insert({ ...args, id: uuidv4() }).returning('*');
      // console.log('q', query);

      if (query.image) {
        query.image = query.image.toString('utf8');
      }
      
      return query;
    },
    updateProduct: async (root, args, { req }, info) => {
      // updateProduct(
      //   id: ID!
      //   name: String!
      //   description: String!
      //   price: Float!
      // ): Product!

      await getAuthUser(req);

      await Joi.assert(args, updateProductValidate, { abortEarly: true });

      const [query] = await knex('product').where({ id: args.id }).update({ name: args.name, description: args.description, price: args.price }).returning('*');
      // console.log('q', query);

      if (!query) {
        throw new Error(`Product with Id '${args.id}' does not exist`);
      }

      if (query.image) {
        query.image = query.image.toString('utf8');
      }
      
      return query;
    },
    deleteProduct: async (root, args, { req }, info) => {
      // deleteProduct(id: ID!): DeleteResponse

      await getAuthUser(req);

      await Joi.assert(args, deleteProductValidate, { abortEarly: true });

      const [query] = await knex('product').where({ id: args.id }).del().returning('*');
      // console.log('q', query);

      // if (!query) {
      //   throw new Error(`Product with Id '${args.id}' does not exist`);
      // }
      
      return {
        success: query ? true : false
      }
    },
    uploadProductImage: async (root, args, { req }, info) => {
      // uploadProductImage(
      //   id: ID!, 
      //   image: String!
      // ): Product!

      await getAuthUser(req);

      await Joi.assert(args, uploadProductImageValidate, { abortEarly: true });

      const [query] = await knex('product').where({ id: args.id }).update({ image: args.image }).returning('*');
      // console.log('q', query);

      if (!query) {
        throw new Error(`Product with Id '${args.id}' does not exist`);
      }
      
      if (query.image) {
        query.image = query.image.toString('utf8');
      }

      return query;
    },
  }
};