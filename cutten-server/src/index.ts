import * as path from 'path';
import * as koa from 'koa';
import 'reflect-metadata';

import {
  createConnection
} from "typeorm";

import {
  Record
} from './entity/Record';

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

// attach koa app to the Apollo Server
server.applyMiddleware({ app });

// create connection to cutten_db
createConnection({
  type: "mysql",
  host: "cutten_db",
  port: 3306,
  username: "root",
  password: "password",
  database: "cutten_db",
  entities: [
    __dirname + "/entity/*.ts"
  ],
  synchronize: true
}).then(async connection => {
  const record = new Record();
  record.filename = "cutten.txt";
  record.date = "2019/10/10";
  record.messageCount = 100;

  // start the server
  app.listen({ port }, () => console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)); 

  await connection.manager.save(record)
  console.log("record saved, record id is", record.id)
  
}).catch(error => console.log(error));