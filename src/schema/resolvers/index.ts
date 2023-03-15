import { pubsub } from '../../lib/pubsub';
import { userResolvers } from '../../modules/users';
import { GraphQLUpload } from 'graphql-upload-minimal';
import { uploadMutation } from './uploadResolver';

const rootResolver = {
  Upload: GraphQLUpload,
  Query: {
    hellWorld: () => {
      return 'Hello World';
    },
  },
  Mutation: {
    singleUpload: uploadMutation,
  },
  Subscription: {
    testingSub: {
      subscribe: () => pubsub.asyncIterator(['CREATE_USER_TOPIC']),
    },
  },
};

export const resolvers = [rootResolver, userResolvers];
