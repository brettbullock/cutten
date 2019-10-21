import * as React from 'react';

import {
  gql
} from 'apollo-boost';

import Header from './Header'
import SelectFileButton from './SelectFileButton'
import UploadButton from './UploadButton'
import AnalyzeButton from './AnalyzeButton'
import ResetButton from './ResetButton'
import DateInput from './DateInput'
import Statistics from './Statistics'

export const ANALYZE_FILE = gql`
  query analyze($date: String) {
    analyze {
      totalPerDay(date: $date)
      # usersPerDay(date: $date) {
      #   name
      #   messageCount
      #   kCount
      # }
    }
  }
`;

// type for Main props - although there are no props in Main
// this type declaration is relevant to ward off ts errors
interface IMainProps {
};

// type for nested totalPerDay state
interface IStateTotalPerDay {
  totalPerDay: number | null;
}

// type for userName
interface IStateUserName {
  name: string | null;
}

// type for messageCount
interface IStateMessageCount {
  messageCount: number | null;
}

// type for kCount
interface IStateKCount {
  kCount: number | null;
}

// type for userPerDay object 
interface IStateUserPerDay {
  name: IStateUserName
  messageCount: IStateMessageCount
  kCount: IStateKCount
}

// type for data response state -> data here is the response of the API call
interface IStateData {
  data: { 
    analyze: {
      totalPerDay: IStateTotalPerDay
      usersPerDay: [IStateUserPerDay]
    }
  }
}

// type for Main state
interface IMainState {
  file: File | null;
  date: String | null;
  isUploaded: boolean | null;
  disableAnalyze: boolean;
  data: { 
    analyze: {
      totalPerDay: IStateTotalPerDay
      usersPerDay: [IStateUserPerDay] 
    }
  } | null;
}

// sets default date to yesterday - using js Date b/c moment wasn't working
const defaultDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

class Main extends React.Component<IMainProps, IMainState> {
  state: IMainState = {
    file: null,
    date: defaultDate(),
    isUploaded: null,
    disableAnalyze: false,
    data: null
  };

  onFileSelect = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {    
    if (!files) {
      return;
    }

    if (files.length === 1) {
      this.setState({
        file: files[0]
      });
    }
  }

  onAnalyzeClick = (client: any) => {
    const data = client.query({
      query: ANALYZE_FILE,
      variables: { date: this.state.date }
    }).then(({ data, loading }: IStateData) => {
      this.setState({data, disableAnalyze: true})
    })
  }

  onResetClick = () => {
    this.setState({
      disableAnalyze: false
    })
  }

  onDateInput = (event: any) => {
    this.setState({date: event.target.value})
  }

  render() {
    const {
      file,
      date,
      disableAnalyze,
      data
    } = this.state;

    return (
      <div>
        <Header/>
        <DateInput
          onDateInput={this.onDateInput}
        />
        <SelectFileButton 
          onFileSelect={this.onFileSelect}
          file={file}
        />
        <UploadButton 
          file={file}
        />
        <AnalyzeButton
          onAnalyzeClick={this.onAnalyzeClick} 
          disabled={disableAnalyze}
        />
        <ResetButton
          disabled={!disableAnalyze}
          onResetClick={this.onResetClick}
        />
        <Statistics
          showStats={disableAnalyze}
          file={file}
          data={data}
          date={date}
        />
      </div>
    )
  }
}

export default Main;