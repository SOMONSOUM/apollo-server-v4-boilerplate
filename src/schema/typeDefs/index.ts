import { userTypeDefs } from '../../modules/users/userTypeDefs';

const rootTypeDefs = `#graphql
  type Ok {
    ok: Boolean
  }

  type Query {
    hellWorld: String
  }

  type Subscription {
    testingSub: String
  }
`;

export const typeDefs = [rootTypeDefs, userTypeDefs];
