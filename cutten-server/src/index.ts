import * as path from 'path';
import * as koa from 'koa';

import {
  fileLoader,
  mergeTypes,
  mergeResolvers
} from 'merge-graphql-schemas';

import {
  ApolloServer
} from 'apollo-server-koa';

const port = 8000;

// fetch all of the files that have defined graphql schema
const typesArray = fileLoader(path.join(__dirname, "./**/*.graphql"));
const resolversArray = fileLoader(path.join(__dirname, "./**/*.resolvers.*"));

// merge the types and resolvers into one file
const typeDefs = mergeTypes(typesArray);
const resolvers = mergeResolvers(resolversArray);

// Init the apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Init the koa app
const app = new koa();

// attach koa app to the Apollo Server
server.applyMiddleware({ app });

// start the server
app.listen({ port }, () => console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`));