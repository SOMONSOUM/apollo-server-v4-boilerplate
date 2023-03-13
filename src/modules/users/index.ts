import { createUserMutation } from './mutation/createUserMutation';

export const userResolvers = {
  Mutation: {
    createUserMutation: createUserMutation,
  },
};
