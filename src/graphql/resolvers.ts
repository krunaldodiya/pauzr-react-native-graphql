import {gql} from 'apollo-boost';
import {GET_AUTH_USER} from './query';

export const typeDefs = gql`
  type Query {
    AuthUser: Auth!
  }

  type Mutation {
    SetAuthUser: Auth!
  }

  type Country {
    id: ID!
    name: String!
    phonecode: String!
    shortname: String!
  }

  type AuthUser {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    language: String!
    country: Country!
  }

  type Auth {
    initialScreen: String!
    authToken: String
    authUser: AuthUser
  }

  input CountryInput {
    id: ID!
    name: String!
    phonecode: String!
    shortname: String!
  }
`;

export const resolvers = {
  Mutation: {
    setAuthUser: (_root: any, _args: any, {cache}: any) => {
      const authUser = cache.readQuery({query: GET_AUTH_USER});

      cache.writeQuery({
        query: GET_AUTH_USER,
        data: {
          auth: {...authUser.auth, ..._args, __typename: 'Auth'},
        },
      });

      return authUser;
    },
  },
};
