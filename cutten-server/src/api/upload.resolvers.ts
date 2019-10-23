import * as readline from 'readline'

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

      // code to modify file so that a tmp file is created with only the dates
      // const rl = readline.createInterface({input: createReadStream('/cutten-server/cutten.txt') })

      // for each line..
      // rl.on('line', (line) => {
      // if line date != date, pop
      // }

      return true;
    }
  },
}
