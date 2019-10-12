import * as React from 'react';

import {
  ThemeProvider,
  theme
} from 'kingsbury/lib';

import Main from './components/Main'

export const App = () => (
  <ThemeProvider theme={theme}>
    <Main/>
  </ThemeProvider>
);

