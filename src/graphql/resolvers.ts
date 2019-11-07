import {GET_COUNTRY, GET_INITIAL_SCREEN} from './query';

export const resolvers = {
  Mutation: {
    setInitialScreen: (_root: any, {initialScreen}: any, {cache}: any) => {
      cache.writeQuery({
        query: GET_INITIAL_SCREEN,
        data: {initialScreen},
      });

      return initialScreen;
    },
    setCountry: (_root: any, {country}: any, {cache}: any) => {
      cache.writeQuery({
        query: GET_COUNTRY,
        data: {country},
      });

      return country;
    },
  },
};
