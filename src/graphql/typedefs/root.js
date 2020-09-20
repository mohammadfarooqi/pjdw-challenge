// const { gql } = require('apollo-server-express');
import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;