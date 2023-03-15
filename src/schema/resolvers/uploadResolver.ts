import { FileUpload } from 'graphql-upload-minimal';
// import sizeOf from 'image-size';
// import { GraphQLError } from 'graphql';
// import request from 'request-promise';
// import { streamToBuffer } from '../../lib/streamToBuffer';

export const uploadMutation = async (
  _: any,
  { file }: { file: FileUpload },
) => {
  // const { createReadStream, filename, mimetype, encoding } = await file;
  console.log(file);

  // const stream = createReadStream();
  // let fileSize = 0;
  // stream.on('end', () => {
  //   fileSize = stream.bytesRead / (1024 * 1024);
  //   fileSize = Number(fileSize.toFixed(4));

  //   if (fileSize > 100) {
  //     throw new GraphQLError('You file is too large!');
  //   }
  // });

  // const json = await request.post({
  //   url: process.env.S1
  //     ? process.env.S1 + '/upload'
  //     : 'https://s3.moc.gov.kh' + '/upload',
  //   formData: {
  //     mocspace: {
  //       value: await streamToBuffer(stream),
  //       options: {
  //         filename: filename,
  //         contentType: mimetype,
  //       },
  //     },
  //   },
  //   auth: {
  //     bearer: process.env.AUTHORIZATION,
  //   },
  //   json: true,
  // });
  // let dimensions;
  // const extention = json.filename.split('/')[4].split('.')[1];

  // if (extention === 'pdf' || extention === 'docx' || extention === 'csv') {
  //   // console.log('file');
  // } else {
  //   dimensions = sizeOf(stream.path);
  // }

  // console.log(file);

  // return {
  //   filename,
  //   url: json.filename,
  //   fileSize,
  //   mimetype,
  //   encoding,
  //   width: dimensions?.width ? dimensions?.width : 0,
  //   height: dimensions?.height ? dimensions?.height : 0,
  // };
};
