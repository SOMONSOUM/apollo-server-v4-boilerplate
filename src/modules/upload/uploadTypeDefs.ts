import { gql } from 'graphql-tag';

export const uploadTypeDefs = gql`
  type Mutation {
    singleUpload(file: Upload): UploadFileResponse
    multipleUpload(files: [Upload]): [UploadFileResponse]
    nextCloudSingleUploadMutation(file: Upload): Ok
  }
`;
