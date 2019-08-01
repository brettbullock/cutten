import * as React from 'react';

import {
  Button
} from 'kingsbury/lib';

class AnalyzeButton extends React.Component {

  onClick = () => {
    this.setState({isClicked: true})
  }

  render () {
    let { file } = this.props;

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