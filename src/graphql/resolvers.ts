import {GET_INITIAL_SCREEN} from './query';
import load_countries from './types/queries/load_countries';

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
        query: load_countries,
        data: {country},
      });

      return country;
    },
  },
};
