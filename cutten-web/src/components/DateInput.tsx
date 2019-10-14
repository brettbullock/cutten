import * as React from 'react';

import {
  Input, Text
} from 'kingsbury/lib';

import '../App.css'

interface IDateInputProps {

}

class DateInput extends React.Component<IDateInputProps> {
  constructor(props: IDateInputProps) {
    super(props)
  }

  render() {

    return (
      <div>
        <Text
          textType="h2"
        >Filter for date: </Text>
        <Input
          htmlType="date"
        />
        {/* if value, output value (for testing purposes) */}
      </div>
    )
  }
}

export default DateInput