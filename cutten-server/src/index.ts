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

import * as mysql from 'mysql';

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

// // database stuff
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'me',
//   password: 'secret',
//   database: 'my_db'
// });

// connection.connect((err) => {
//   if (err) {
//     console.log('error connecting: ' + err.stack)
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

// connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
//   if (error) {
//     throw error;
//   }
//   console.log('The solution is: ', results[0].solution)
// })

// connection.end();

// attach koa app to the Apollo Server
server.applyMiddleware({ app });

// start the server
app.listen({ port }, () => console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`));