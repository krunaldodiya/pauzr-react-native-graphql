import {gql} from 'apollo-boost';

export const typeDefs = gql`
  type Query {
    getInitialScreen: String!
    getCountry: Country!
  }

  type Mutation {
    setInitialScreen: String!
    setCountry: Country!
  }
`;
