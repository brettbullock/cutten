import * as React from 'react';

import {
  Button
} from 'kingsbury/lib';

interface ISelectFileState {
  file: File | null;
}

interface ISelectFileProps {
  file: File | null;
  onFileSelect: (event: any) => void;
}

class SelectFileButton extends React.Component<ISelectFileProps, ISelectFileState> {
  fileRef: any;

  constructor(props: ISelectFileProps) {
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