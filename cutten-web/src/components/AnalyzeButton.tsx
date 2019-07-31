import * as React from 'react';

import {
  Button
} from 'kingsbury/lib';

class AnalyzeButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isClicked: false,
    }
  }

  onClick = () => {
    this.setState({isClicked: true})
  }

  render () {
    let { file } = this.props;
    let { isClicked } = this.state;

    return (
      <div>
        <Button
          type="primary"
          onClick={this.onClick}
          disabled={!file}
        >
          Analyze
        </Button>
        {isClicked && 
          <p>Brett's a dev</p>}
      </div>
    )
  }
}

export default AnalyzeButton