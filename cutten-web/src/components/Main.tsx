import * as React from 'react';

import {
  gql
} from 'apollo-boost';

import SelectFileButton from './SelectFileButton'
import UploadButton from './UploadButton'
import AnalyzeButton from './AnalyzeButton'
import DateInput from './DateInput'

export const ANALYZE_FILE = gql`
  query analyze {
    analyze {
      totalPerDay
      usersPerDay {
        name
        messageCount
        kCount
      }
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

// type for userPerDay object 
interface IStateUserPerDay {
  name: IStateUserName
  messageCount: IStateMessageCount
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
  isUploaded: boolean | null;
  data: { 
    analyze: {
      // [key: string]: IStateUsersPerDayArray | IStateTotalPerDay
      totalPerDay: IStateTotalPerDay
      usersPerDay: [IStateUserPerDay] 
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
        <DateInput/>
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

        <div>
          {data &&
            <div>
              <h2>{data.analyze.totalPerDay} messages sent yesterday</h2>
              {data.analyze.usersPerDay.map((user: IStateUserPerDay, index: number) => (
                <h3 key={index}>{user.name} sent {user.messageCount} in total</h3>  
              ))}
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Main;