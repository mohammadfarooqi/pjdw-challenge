import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getProduct(id: ID!): Product!
    getAllProducts: [Product!]!
  }

  extend type Mutation {
    insertProduct(
      name: String!
      description: String!
      price: Float!
    ): Product!
    updateProduct(
      id: ID!
      name: String!
      description: String!
      price: Float!
    ): Product!
    deleteProduct(id: ID!): DeleteResponse
    uploadProductImage(
      id: ID!, 
      image: String!
    ): Product!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    image: String
  }
`;