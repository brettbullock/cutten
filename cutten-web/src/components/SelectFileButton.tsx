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

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div className="button">
          <React.Fragment>
            <input
              style={{ display: 'none' }}
              type="file"
              ref={this.fileRef}
              onChange={this.onChange}
            />
            <Button
              buttonType="primary"
              onClick={
                this.onClick
              }
            >
              Select File
            </Button>
          </React.Fragment>
        </div>
      </div>
    )
  }
}

export default SelectFileButton;