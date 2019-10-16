import {
  createWriteStream
} from 'fs';

export default {
  Mutation: {
    upload: async (parent, { file }) => {

      // extract the contents of the file during once the upload has completed
      const { createReadStream, filename } = await file;

      // enforce that the file is .txt
      if (!filename.endsWith(".txt")) {
        return false;
      }

      // init the read stream
      const readStream = createReadStream();

      // init the write stream
      const writeStream = createWriteStream('/cutten-server/' + filename);

      // read the file and write file to disk
      await readStream.pipe(writeStream);

      return true;
    }
  },
}
