import * as React from 'react';

import {
  gql
} from 'apollo-boost';

import SelectFileButton from './SelectFileButton'
import UploadButton from './UploadButton'
import AnalyzeButton from './AnalyzeButton'

export const ANALYZE_FILE = gql`
  query analyze {
    analyze {
      perDay
    }
  }
`;

// type for Main props
interface IMainProps {
  file: File | null;
};

// type for nested perDay state
interface IStatePerDay {
  perDay: number | null;
}

// type for data response state -> data here is the response of the API call
interface IStateData {
  data: { 
    [key: string]: {
      [key: string]: IStatePerDay
    }
  }
}

// type for Main state
interface IMainState {
  file: File | null;
  isUploaded: boolean | null;
  data: { 
    [key: string]: {
      [key: string]: IStatePerDay
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
        <div>
          {data &&
          <h2>{data.analyze.perDay} messages sent yesterday</h2>}
        </div>
      </div>
    )
  }
}

export default Main;