import {gql} from 'apollo-boost';

export const typeDefs = gql`
  type Query {
    getAuthUser: User!
  }

  type Mutation {
    setAuthUser: User!
  }

  extend type User {
    initialScreen: String
  }
`;
