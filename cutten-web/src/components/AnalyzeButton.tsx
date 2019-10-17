import * as React from 'react';

import { 
  ApolloConsumer
} from 'react-apollo';

import {
  Button
} from 'kingsbury/lib';

import '../App.css'
interface IAnalyzeButtonProps {
  disabled: boolean;
  onAnalyzeClick: (client: any) => void;
}

class AnalyzeButton extends React.Component<IAnalyzeButtonProps> {
  constructor(props: IAnalyzeButtonProps) {
    super(props)
  }

  render () {
    const { disabled } = this.props;

    return (
      <ApolloConsumer>
        {client => (
          <div className="button">
            <Button
              buttonType="primary"
              disabled={disabled}
              onClick={() => this.props.onAnalyzeClick(client)}
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