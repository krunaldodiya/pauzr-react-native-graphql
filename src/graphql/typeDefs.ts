import {gql} from 'apollo-boost';

export const typeDefs = gql`
  type Query {
    getAuthUser: User!
    getAuthToken: String!
    getInitialScreen: String!
  }

  type Mutation {
    setAuthUser: User!
    setAuthToken: String!
    setInitialScreen: String!
  }

  type Country {
    id: ID!
    name: String!
    phonecode: String!
    shortname: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    language: String!
    country: Country!
  }

  input CountryInput {
    id: ID!
    name: String!
    phonecode: String!
    shortname: String!
  }
`;
