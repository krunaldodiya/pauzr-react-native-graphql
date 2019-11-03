import {GET_AUTH_USER, GET_INITIAL_SCREEN, GET_AUTH_TOKEN} from './query';

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

    setAuthToken: (_root: any, _args: any, {cache}: any) => {
      cache.writeQuery({
        query: GET_AUTH_TOKEN,
        data: _args,
      });

      return _args;
    },
  },
};
