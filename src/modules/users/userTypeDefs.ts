import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type Mutation {
    createUserMutation(input: UserInput!): Ok
  }

  input UserInput {
    email: String
    password: String
    name: String
    phoneNumber: String
    profilePicture: String
  }
`;
