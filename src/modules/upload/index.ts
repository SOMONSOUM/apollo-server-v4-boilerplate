import { MultipleFileUploadMutation } from './mutation/multipleFileUploadMution';
import { nextCloudSingleUploadMutation } from './mutation/nextCloudeSingleUploadMutation';
import { singleUploadMutation } from './mutation/singleFileUploadMutation';

export const uploadResolver = {
  Mutation: {
    singleUpload: singleUploadMutation,
    multipleUpload: MultipleFileUploadMutation,
    nextCloudSingleUpload: nextCloudSingleUploadMutation,
  },
};
