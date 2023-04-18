import { FileUpload } from 'graphql-upload-minimal';
import { ApolloServerFileUploads } from '~/types/fileType';
import { singleUploadMutation } from './singleFileUploadMutation';

export const MultipleFileUploadMutation = async (
  _: any,
  { files }: { files: FileUpload[] },
): Promise<ApolloServerFileUploads.UploadedFileResponse[]> => {
  return Promise.all(
    files.map((file) => singleUploadMutation(null, { file: file })),
  );
};
