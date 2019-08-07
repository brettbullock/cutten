import * as React from 'react';

import {
  gql
} from 'apollo-boost';

import {
  Query
} from 'react-apollo';

import {
  ThemeProvider,
  theme
} from 'kingsbury/lib';

import Main from './components/Main'

export const App = () => (
  <ThemeProvider theme={theme}>
    <Main />
  </ThemeProvider>
);

