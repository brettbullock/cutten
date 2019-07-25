import * as React from 'react';

import {
  gql
} from 'apollo-boost';

import {
  Mutation
} from 'react-apollo';

import {
  Button
} from 'kingsbury/lib';
import console = require('console');

interface IUploadButtonState {
  file: File | null;
  uploaded: boolean;
}

export const UPLOAD_FILE = gql`
  mutation upload($file: Upload!) {
    upload(file: $file)
  }
`;

export const ANALYZE = gql`
  mutation anaylze {
    analyze {
      name
    }
  }
`;

class UploadButton extends React.Component<any, IUploadButtonState> {
  fileRef: any;

  constructor(props: any) {
    super(props);

    this.fileRef = React.createRef();

    this.state = {
      file: null,
      uploaded: false
    };

  }

  onChange = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {    
    if (!files) {
      return;
    }

    if (files.length === 1) {
      this.setState({
        file: files[0]
      });
    }
  }

  onClick = () => {
    if (!this.fileRef) {
      return;
    }

    const {
      current: fileInput
    } = this.fileRef;

    fileInput.click();
  }

  onUpload = (uploadMutation: any) => {
    const {
      file
    } = this.state;

    uploadMutation({
      variables: { file }
    })
    .then(() => this.setState({ uploaded: true }))
    .catch(() => console.log('error'));
  }

  onAnalyze = (mutation: any) => {
    mutation()
    .then((name: any) => console.log(name))
    .catch(() => console.log('error'));
  }

  render() {
    const {
      file,
      uploaded
    } = this.state;

    return (
      <Mutation mutation={uploaded ? ANALYZE : UPLOAD_FILE}>
        {(mutation: any) => {

          let buttonText: string;
          let clickHandler: any;

          if (file == null) {
            buttonText = 'Select File';
            clickHandler = this.onClick;
          } else if (file !== null && !uploaded) {
            buttonText = 'Upload';
            clickHandler = () => this.onUpload(mutation);
          } else {
            buttonText = 'Analyze';
            clickHandler = () => this.onAnalyze(mutation);
          }
          
          return (
            <React.Fragment>
              <input
                style={{ display: 'none' }}
                type="file"
                ref={this.fileRef}
                onChange={this.onChange}
              />
              <Button
                type="primary"
                onClick={clickHandler}
              >
                {buttonText}
              </Button>
              {file &&
                <div>{file.name}</div>
              }
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default UploadButton;

// select file file == null
// upload file file !== null
// anaylze file uploaded == true
