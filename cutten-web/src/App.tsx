import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import {
  ThemeProvider,
  theme,
  Notice
} from 'kingsbury/lib';

const TEST_QUERY = gql`
  query {
    hello
  }
`

export const App = () => {
  return (
    <Query query={TEST_QUERY}>
      {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      return (
        <ThemeProvider theme={theme}>
          <Notice
            type="info"
            title="Hello from Kingbury"
            description={data.hello}
          />
        </ThemeProvider>
      )
    }}
    </Query>
  );
}
