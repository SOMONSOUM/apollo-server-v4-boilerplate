import { FileUpload } from 'graphql-upload-minimal';
import cloudinary from 'cloudinary';
import { config } from 'dotenv';
import axios from 'axios';
import { ApolloServerFileUploads } from '../../../types/fileType';
config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const singleUploadMutation = async (
  parent: any,
  { file }: { file: FileUpload },
): Promise<ApolloServerFileUploads.UploadedFileResponse> => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();
  // return new Promise((resolve, reject) => {
  //   const uploadStream = cloudinary.v2.uploader.upload_stream(
  //     {
  //       folder: 'upload_files',
  //       public_id: filename.split('.')[0],
  //     },
  //     (error, file: any) => {
  //       if (error) return reject(error);
  //       return resolve({
  //         url: file.secure_url,
  //         filename,
  //         mimetype,
  //         encoding,
  //       } as ApolloServerFileUploads.UploadedFileResponse);
  //     },
  //   );
  //   stream.pipe(uploadStream);
  // });
  const bearer = process.env.AUTHORIZATION as string;
  const url: string = process.env.S1
    ? process.env.S1 + '/upload'
    : 'https://s3.moc.gov.kh' + '/upload';
  console.log(process.env.AUTHORIZATION);

  const response: any = await axios.post(url, stream, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Content-Encoding': 'gzip, deflate, br',
    },
  });
  // const data = await response.json();
  // return data;
  return {
    url: response.filename,
    filename,
    mimetype,
    encoding,
  } as ApolloServerFileUploads.UploadedFileResponse;
};
