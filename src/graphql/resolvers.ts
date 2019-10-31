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
    id: Int!
    name: String!
    phonecode: String!
    shortname: String!
  }

  input CountryInput {
    id: Int!
    name: String!
    phonecode: String!
    shortname: String!
  }

  type Auth {
    initialScreen: String!
    authToken: String
    selectedCountry: Country
    selectedLanguage: String
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
