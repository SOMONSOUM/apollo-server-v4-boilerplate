import { userTypeDefs } from '../../modules/users/userTypeDefs';

const rootTypeDefs = `#graphql
  scalar Upload

  type Ok {
    ok: Boolean
  }

  type Query {
    hellWorld: String
  }

  type Mutation {
    singleUpload(file: Upload): UploadFileResponse
  }

  type Subscription {
    testingSub: String
  }

  type UploadFileResponse {
    filename: String
    url: String
    fileSize: String
    mimetype: String
    encoding: String
    width: String
    height: String
  }
`;

export const typeDefs = [rootTypeDefs, userTypeDefs];
