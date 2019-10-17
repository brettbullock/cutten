import * as React from 'react';

import {
  Button
} from 'kingsbury/lib';

// ResetButton props type
interface IResetButtonProps {
  disabled: boolean;
  onResetClick: () => void;
}

class ResetButton extends React.Component<IResetButtonProps> {
  constructor(props: IResetButtonProps) {
    super(props)
  }
  
  render() {
    const { disabled } = this.props

    return (
      <Button
        disabled={disabled}
        onClick={() => this.props.onResetClick()}
      >
        Reset Analyzer
      </Button>
    )
  }
}

export default ResetButton