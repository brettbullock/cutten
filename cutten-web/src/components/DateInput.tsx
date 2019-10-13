import * as React from 'react';

import {
  Input
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
        <Input
          placeholder="Select a date"
          borderType="none"
          // htmlType="date"
        />
      </div>
    )
  }
}

export default DateInput