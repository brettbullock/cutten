import * as React from 'react';

import {
  Button
} from 'kingsbury/lib';

interface IAnalyzeButton {
  file: File | null;
}

class AnalyzeButton extends React.Component<IAnalyzeButton> {

  onClick = () => {
    this.setState({isClicked: true})
  }

  render () {
    const { file } = this.props;

    return (
      <div>
        <Button
          type="primary"
          onClick={this.onClick}
          disabled={!file}
        >
          Analyze
        </Button>
      </div>
    )
  }
}

export default AnalyzeButton