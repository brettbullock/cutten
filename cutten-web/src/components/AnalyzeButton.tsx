import * as React from 'react';

import '../App.css'

import { 
  ApolloConsumer
} from 'react-apollo';

import {
  Button
} from 'kingsbury/lib';

interface IAnalyzeButton {
  file: File | null;
  onAnalyzeClick: (client: any) => void;
}

class AnalyzeButton extends React.Component<IAnalyzeButton> {
  constructor(props: IAnalyzeButton) {
    super(props)

    this.state = { data: null }
  }

  render () {
    const { file } = this.props;

    return (
      <ApolloConsumer>
        {client => (
          <div className="button">
            <Button
              type="primary"
              onClick={() => this.props.onAnalyzeClick(client)}
              // disabled={!file}
            >
              Analyze File
            </Button>

            {this.state.data === 0 && 
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