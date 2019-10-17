import * as React from 'react';

import {
  Input
} from 'kingsbury/lib';

import '../App.css'

interface IDateInputProps {
  onDateInput: (event: any) => void
}

class DateInput extends React.Component<IDateInputProps> {
  constructor(props: IDateInputProps) {
    super(props)
  }

  render() {

    return (
      <div>
        <Input
          label="Filter for date (optional, default is yesterday):"
          htmlType="date"
          onChange={this.props.onDateInput}
        />
      </div>
    )
  }
}

export default DateInput