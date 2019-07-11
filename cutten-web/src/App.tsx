import * as React from "react";

import {
  ThemeProvider,
  theme,
  Notice
} from 'kingsbury/lib';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Notice
        type="info"
        title="Hello from Kingbury"
        description="got it to workkk"
      />
    </ThemeProvider>
  );
}
