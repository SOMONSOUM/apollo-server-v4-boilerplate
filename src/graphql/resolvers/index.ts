import { GraphQLUpload } from 'graphql-upload-minimal';
import { pubsub } from '~/lib/pubsub';
import { uploadResolver } from '~/modules/upload';
import { userResolvers } from '~/modules/users';

const rootResolver = {
  Upload: GraphQLUpload,
  Query: {
    hellWorld: () => {
      return 'Hello World';
    },
  },
  Mutation: {
    testingMuation: () => {
      return true;
    },
  },
  Subscription: {
    testingSub: {
      subscribe: () => pubsub.asyncIterator(['CREATE_USER_TOPIC']),
    },
  },
};

export const resolvers = [rootResolver, userResolvers, uploadResolver];
