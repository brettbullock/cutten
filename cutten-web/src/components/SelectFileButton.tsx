import * as React from 'react';

import {
  Button
} from 'kingsbury/lib';

interface IUploadButtonState {
  file: File | null;
}

class SelectFileButton extends React.Component<any, IUploadButtonState> {
  fileRef: any;

  constructor(props: any) {
    super(props);

    this.fileRef = React.createRef();
  }

  onChange = (e) => {
    this.props.onFileSelect(e)
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
    } = this.props;

    return (
      <div>
        <React.Fragment>
          <input
            style={{ display: 'none' }}
            type="file"
            ref={this.fileRef}
            onChange={this.onChange}
          />
          <Button
            type="primary"
            onClick={
              this.onClick
            }
            disabled={file}
          >
            Select File
          </Button>
          {file &&
            <div>{file.name}</div>
          }
        </React.Fragment>
      </div>
    )
  }
}

export default SelectFileButton;