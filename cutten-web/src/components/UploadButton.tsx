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
  mutation upload($file: Upload!) {
    upload(file: $file)
  }
`;

class UploadButton extends React.Component<any, IUploadButtonState> {
  fileRef: any

  render() {
    const {
      file
    } = this.props;

    return (
      <div className="button">
        <Mutation mutation={UPLOAD_FILE}>
          {(upload: any) => (
            <React.Fragment>
              <input
                style={{ display: 'none' }}
                type="file"
              />
              <Button
                buttonType="primary"
                onClick={file && (
                  () =>
                    upload({
                    variables: { file }
                  })
                )}
              >
                Upload File
              </Button>
            </React.Fragment>
          )}
        </Mutation>
      </div>
    );
  }
}

export default UploadButton;