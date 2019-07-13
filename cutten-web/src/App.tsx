import * as React from 'react';

import {
  gql
} from 'apollo-boost';

import {
  Query
} from 'react-apollo';

import {
  ThemeProvider,
  theme,
  Notice
} from 'kingsbury/lib';

export interface Data {
  hello: string;
};

const TEST_QUERY = gql`
  query {
    hello
  }
`;


export const App = () => (
  <Query<Data, any> query={TEST_QUERY}>
    {({ loading, error, data }) => {

      if (loading) {
        return <p>Loading...</p>
      };

      if (error) {
        return <p>Error</p>;
      };

      // need to handle this case just because ts will complain because data
      // could be undefined
      if (!data) {
        return <p>No data</p>;
      }

      const {
        hello
      } = data;

      return (
        <ThemeProvider theme={theme}>
          <Notice
            type="info"
            title="Hello from Kingbury"
            description={hello}
          />
        </ThemeProvider>
      );
    }}
  </Query>
);

