import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';

import { IN_PROD, PORT } from './config';

// const knex = require('./db/knex');
// import knex from './db/knex';

// init app
const app = express();

// setup middlewares
app.disable('x-powered-by');

// console.log('r', [...resolvers])

// start apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: IN_PROD ? false : { settings: { 'request.credentials': 'include' } },
  engine: {    
    reportSchema: true,
    variant: 'current'
  },
  context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app });

// start app function
const startApp = async () => {
  try {
    // connect db
    // const c = (await knex('user')).entries();
    // for (var value of c) {
    //   console.log(value);
    // }
    
    // start listening for requests
    app.listen({ port: PORT }, () =>
      console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
  } catch (error) {
    console.log(`Unable to start the server ${error.message}`);
  }
};

startApp();
