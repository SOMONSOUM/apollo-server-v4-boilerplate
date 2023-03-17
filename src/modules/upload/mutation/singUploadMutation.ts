import { FileUpload } from 'graphql-upload-minimal';
import cloudinary from 'cloudinary';
import { config } from 'dotenv';
import { ApolloServerFileUploads } from '../../../types/fileType';
config();

cloudinary.v2.config({
  cloud_name: process.env.STORAGE_NAME,
  api_key: process.env.STORAGE_API_KEY,
  api_secret: process.env.STORAGE_API_SECRET,
});

export const singleUploadMutation = async (
  parent: any,
  { file }: { file: FileUpload },
) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'upload_files',
        public_id: filename.split('.')[0],
      },
      (error, file: any) => {
        if (error) return reject(error);
        return resolve({
          url: file.secure_url,
          filename,
          mimetype,
          encoding,
        } as ApolloServerFileUploads.UploadedFileResponse);
      },
    );
    stream.pipe(uploadStream);
  });
};
