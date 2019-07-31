import * as React from 'react';

import {
  gql
} from 'apollo-boost';

import {
  Query
} from 'react-apollo';

import {
  ThemeProvider,
  theme,
  Notice
} from 'kingsbury/lib';

import SelectButton from './SelectButton'
import UploadButtonV2 from './UploadButtonV2'
import AnalyzeButton from './AnalyzeButton'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      file: null,
      isUploaded: null
    };
  }

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

  render() {
    let { file } = this.state;

    return (
      <div>
        <SelectButton 
          onFileSelect={this.onFileSelect}
          file={file}
        />
        <UploadButtonV2 
          file={file}
        />
        <AnalyzeButton 
          file={file}
        />
      </div>
    )
  }
}

export default Main;