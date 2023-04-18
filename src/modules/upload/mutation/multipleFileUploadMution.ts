import { FileUpload } from 'graphql-upload-minimal';
import { singleUploadMutation } from './singleFileUploadMutation';
import { ApolloServerFileUploads } from '../../../types/fileType';

export const MultipleFileUploadMutation = async (
  _: any,
  { files }: { files: FileUpload[] },
): Promise<ApolloServerFileUploads.UploadedFileResponse[]> => {
  return Promise.all(
    files.map((file) => singleUploadMutation(null, { file: file })),
  );
};
