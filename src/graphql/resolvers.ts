import {gql} from 'apollo-boost';
import {GET_AUTH_USER, GET_INITIAL_SCREEN} from './query';

export const typeDefs = gql`
  type Query {
    GetAuthUser: AuthUser!
    GetInitialScreen: String!
  }

  type Mutation {
    SetAuthUser: AuthUser!
    SetInitialScreen: String!
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
          auth: {...authUser, ..._args, __typename: 'Auth'},
        },
      });

      return authUser;
    },

    setInitialScreen: (_root: any, _args: any, {cache}: any) => {
      cache.writeQuery({
        query: GET_INITIAL_SCREEN,
        data: _args,
      });

      return _args;
    },
  },
};
