import * as koa from 'koa';
import * as koaRouter from 'koa-router';
import * as koaBody from 'koa-bodyparser';

import {
  ApolloServer,
  gql
} from 'apollo-server-koa';

const port = 8000;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Init the apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Init the koa app
const app = new koa();

// attach koa app to the Apollo Server
server.applyMiddleware({ app });

// start the server
app.listen({ port }, () => console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`));