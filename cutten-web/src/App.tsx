import * as React from 'react';

import {
  ThemeProvider,
  theme
} from 'kingsbury/lib';

import UploadButton from './components/UploadButton';

export const App = () => (
  <ThemeProvider theme={theme}>
    <UploadButton />
  </ThemeProvider>
);

