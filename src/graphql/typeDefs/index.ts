import gql from 'graphql-tag';
import { uploadTypeDefs } from '~/modules/upload/uploadTypeDefs';
import { userTypeDefs } from '~/modules/users/userTypeDefs';

const rootTypeDefs = gql`
  scalar Upload
  scalar JSON

  type Ok {
    ok: Boolean
  }

  type Query {
    hellWorld: String
  }

  type Mutation {
    testingMuation: Boolean
  }

  type Subscription {
    testingSub: String
  }

  type UploadFileResponse {
    url: String
    filename: String
    mimetype: String
    encoding: String
  }
`;

export const typeDefs = [rootTypeDefs, userTypeDefs, uploadTypeDefs];
