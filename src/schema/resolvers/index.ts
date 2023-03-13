import { pubsub } from '../../lib/pubsub';
import { userResolvers } from '../../modules/users';

const rootResolver = {
  Query: {
    hellWorld: () => {
      return 'Hello World';
    },
  },
  Subscription: {
    testingSub: {
      subscribe: () => pubsub.asyncIterator(['CREATE_USER_TOPIC']),
    },
  },
};

export const resolvers = [rootResolver, userResolvers];
