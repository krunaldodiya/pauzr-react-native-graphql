import {InMemoryCache} from 'apollo-boost';

export const cache = new InMemoryCache();

cache.writeData({
  data: {
    auth: {
      initialScreen: 'Auth',
      authToken: null,
      selectedCountry: {
        id: '101',
        name: 'India',
        phonecode: '91',
        shortname: 'IN',
        __typename: 'Country',
      },
      selectedLanguage: 'en',
      __typename: 'Auth',
    },
  },
});
