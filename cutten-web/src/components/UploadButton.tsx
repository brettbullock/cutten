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

interface IUploadButtonState {
  file: File | null;
}

export const UPLOAD_FILE = gql`
  mutation fuckyouu($file: Upload!) {
    upload(file: $file)
  }
`;

class UploadButton extends React.Component<any, IUploadButtonState> {
  fileRef: any;

  constructor(props: any) {
    super(props);

    this.fileRef = React.createRef();

    this.state = {
      file: null
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

  render() {
    const {
      file
    } = this.state;

    return (
      <Mutation mutation={UPLOAD_FILE}>
        {(upload: any) => (
          <React.Fragment>
            <input
              style={{ display: 'none' }}
              type="file"
              ref={this.fileRef}
              onChange={this.onChange}
            />
            <Button
              type="primary"
              onClick={file ?
                () => upload({
                  variables: { file }
                }) :
                this.onClick
              }
            >
              {file ? 'Analyze' : 'Select File'}
            </Button>
            {file && file &&
              <div>{file.name}</div>
            }
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default UploadButton;