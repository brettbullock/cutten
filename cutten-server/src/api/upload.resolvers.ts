import {
  createWriteStream
} from 'fs';

export default {
  Mutation: {
    upload: async (parent, { file }) => {

      // extract the contents of the file during once the upload has completed
      const { createReadStream, filename } = await file;
  
      // enforce that the file name is cutten
      if (filename !== 'cutten.txt') {
        return false;
      }

      // init the read stream
      const readStream = createReadStream();

      // init the write stream
      const writeStream = createWriteStream('/cutten-server/cutten.txt');

      // read the file and write file to disk
      readStream.on('data', (data) => {
        writeStream.write(data.toString());
      });

      return true;
    }
  },
}
