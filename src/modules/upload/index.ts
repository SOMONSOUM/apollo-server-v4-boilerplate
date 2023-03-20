import { MultipleFileUploadMutation } from './mutation/multipleFileUploadMution';
import { singleUploadMutation } from './mutation/singleFileUploadMutation';

export const uploadResolver = {
  Mutation: {
    singleUpload: singleUploadMutation,
    multipleUpload: MultipleFileUploadMutation,
  },
};
