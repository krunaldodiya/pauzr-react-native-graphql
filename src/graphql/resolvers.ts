import {GET_AUTH_USER} from './query';

export const resolvers = {
  Mutation: {
    setAuthUser: (_root: any, _args: any, {cache}: any) => {
      const authUser = cache.readQuery({query: GET_AUTH_USER});

      cache.writeQuery({
        query: GET_AUTH_USER,
        data: {
          user: _args,
        },
      });

      return authUser;
    },

    hello: (_root: any, _args: any, {cache}: any) => {
      console.log(_args);
    },
  },
};
