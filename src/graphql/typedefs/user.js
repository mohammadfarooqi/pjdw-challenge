import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]!
    login(email: String!): Auth!
  }

  extend type Mutation {
    addProductToUser(id: ID!): InsertResponse!
    removeProductFromUser(id: ID!): DeleteResponse
    getAllProductsForUser: [Product!]!
  }

  type DeleteResponse {
    success: Boolean!
    message: String
  }

  type InsertResponse {
    success: Boolean!
    message: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  # products: [Product]
  }

  type Auth {
    user: User!
    token: String!
  }
`;