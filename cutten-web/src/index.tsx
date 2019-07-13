import * as React from 'react';

import {
  default as ApolloClient
}  from 'apollo-boost';

import {
  render
} from 'react-dom';

import {
  ApolloProvider
} from 'react-apollo';

import {
  App
} from './App';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
});

render (
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>, 
  document.getElementById('root')
);
