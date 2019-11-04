import {GET_AUTH_USER} from './query';

export const resolvers = {
  Mutation: {
    setAuthUser: (_root: any, _args: any, {cache}: any) => {
      console.log('_args', _args);

      const data = {
        user: _args.authUser,
        __typename: 'User',
      };

      cache.writeQuery({
        query: GET_AUTH_USER,
        data,
      });

      return data;
    },
  },
};
