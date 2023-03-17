import { singleUploadMutation } from './mutation/singUploadMutation';

export const uploadResolver = {
  Mutation: {
    singleUpload: singleUploadMutation,
  },
};
