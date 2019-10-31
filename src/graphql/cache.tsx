import {InMemoryCache} from 'apollo-boost';

export const cache = new InMemoryCache();

cache.writeData({
  data: {
    initialScreen: 'Auth',
    authToken: null,
    authUser: {
      id: null,
      name: null,
      email: null,
      mobile: null,
      language: null,
      country: {
        id: 'e1c417cf-550a-4457-b744-1db7fd5c86fb',
        name: 'India',
        phonecode: '91',
        shortname: 'IN',
        __typename: 'Country',
      },
      __typename: 'AuthUser',
    },
  },
});
