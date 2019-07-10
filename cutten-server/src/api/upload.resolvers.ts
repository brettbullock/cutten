export default {
  Mutation: {
    async upload(parent, { file }) {
      const { stream, filename, mimetype, encoding } = await file;

      console.log(stream, file, mimetype, encoding);
    }
  }
}