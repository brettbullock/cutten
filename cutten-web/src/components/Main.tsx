import * as React from 'react';

import {
  gql
} from 'apollo-boost';

import SelectFileButton from './SelectFileButton'
import UploadButton from './UploadButton'
import AnalyzeButton from './AnalyzeButton'
import { userInfo } from 'os';

export const ANALYZE_FILE = gql`
  query analyze {
    analyze {
      totalPerDay
      usersPerDay {
        name
        messageCount
      }
    }
  }
`;

// type for Main props
interface IMainProps {
  file: File | null;
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

// type for userPerDay object 
interface IStateUserPerDay {
  userPerDay: {
    [key: string]: IStateUserName | IStateMessageCount
  }
}
// type for usersPerDay array
interface IStateUsersPerDayArray {
  [index: number]: IStateUserPerDay 
}

// type for data response state -> data here is the response of the API call
interface IStateData {
  data: { 
    [key: string]: {
      [key: string]: IStateUsersPerDayArray | IStateTotalPerDay
    }
  }
}

// type for Main state
interface IMainState {
  file: File | null;
  isUploaded: boolean | null;
  data: { 
    [key: string]: {
      [key: string]: IStateUsersPerDayArray | IStateTotalPerDay
    }
  } | null;
}

class Main extends React.Component<IMainProps, IMainState> {
  state: IMainState = {
    file: null,
    isUploaded: null,
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
      query: ANALYZE_FILE
    }).then(({ data }: IStateData) => {
      this.setState({data})
    })
  }

  render() {
    const {
      file,
      data
    } = this.state;

    return (
      <div>
        <SelectFileButton 
          onFileSelect={this.onFileSelect}
          file={file}
        />
        <UploadButton 
          file={file}
        />
        <AnalyzeButton
          onAnalyzeClick={this.onAnalyzeClick} 
          file={file}
        />

        <div>
          {file &&
          <h2>{file.name} ready for upload.</h2>}
        </div>
        {/* going to clean this up */}
        <div>
          {data &&
            <div>
              <h2>{data.analyze.totalPerDay} messages sent yesterday</h2>
              <h3>{data.analyze.usersPerDay[0].name} sent {data.analyze.usersPerDay[0].messageCount} in total</h3>
              <h3>{data.analyze.usersPerDay[1].name} sent {data.analyze.usersPerDay[1].messageCount} in total</h3>
              <h3>{data.analyze.usersPerDay[2].name} sent {data.analyze.usersPerDay[2].messageCount} in total</h3>
            </div>
          }

        </div>
      </div>
    )
  }
}

export default Main;