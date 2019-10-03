import * as React from 'react';

import '../App.css'

import { 
  ApolloConsumer
} from 'react-apollo';

import {
  gql
} from 'apollo-boost';

import {
  Button
} from 'kingsbury/lib';

import console = require('console');

export const ANALYZE_FILE = gql`
  query analyze {
    analyze
  }
`;

interface IAnalyzeButton {
  file: File | null;
}

class AnalyzeButton extends React.Component<IAnalyzeButton> {
  constructor(props) {
    super(props)

    this.state = { data: null }
  }

  onAnalyzeClick = (client) => {
    const data = client.query({
      query: ANALYZE_FILE
    }).then(({ data }) => {
      this.setState({data: data.analyze})
    })
  }

  render () {
    const { file } = this.props;

    return (
      <ApolloConsumer>
        {client => (
          <div className="button">
            <Button
              type="primary"
              onClick={() => this.onAnalyzeClick(client)}
              // disabled={!file}
            >
              Analyze File
            </Button>

            {this.state.data && 
              <div>Number of messages sent yesterday: {this.state.data}</div>
            }
          </div>
        )}
      </ApolloConsumer>
              
    )
  }
}

export default AnalyzeButton

{/* <ApolloConsumer>
        {client => (
          <div>
            {this.state.dog && <img src={this.state.dog.displayImage} />}
            <button
              onClick={async () => {
                const { data } = await client.query({
                  query: GET_DOG_PHOTO,
                  variables: { breed: 'bulldog' },
                });
                this.onDogFetched(data.dog);
              }}
            >
              Click me!
            </button>
          </div>
        )}
      </ApolloConsumer> */}