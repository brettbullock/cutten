import * as React from 'react';

import { 
  ApolloConsumer
} from 'react-apollo';

import {
  Button
} from 'kingsbury/lib';

import '../App.css'
interface IAnalyzeButtonProps {
  file: File | null;
  onAnalyzeClick: (client: any) => void;
}

class AnalyzeButton extends React.Component<IAnalyzeButtonProps> {
  constructor(props: IAnalyzeButtonProps) {
    super(props)
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
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default AnalyzeButton