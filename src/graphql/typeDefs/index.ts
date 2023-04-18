import gql from 'graphql-tag';
import { userTypeDefs } from '../../modules/users/userTypeDefs';
import { uploadTypeDefs } from '../../modules/upload/uploadTypeDefs';

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
