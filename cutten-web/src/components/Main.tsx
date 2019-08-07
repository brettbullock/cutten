import * as React from 'react';

import SelectFileButton from './SelectFileButton'
import UploadButton from './UploadButton'
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
        <SelectFileButton 
          onFileSelect={this.onFileSelect}
          file={file}
        />
        <UploadButton 
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