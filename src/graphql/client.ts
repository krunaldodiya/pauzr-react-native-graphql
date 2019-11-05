import {ApolloClient, ApolloLink, HttpLink} from 'apollo-boost';
import {RetryLink} from 'apollo-link-retry';
import {resolvers} from './resolvers';
import {typeDefs} from './typeDefs';
import {GET_AUTH_USER} from './query';

const getApolloClient = (cache: any) => {
  const url = 'https://pauzr.tk/graphql';
  // const url = 'https://vapor.test/graphql-playground';

  const retryLink = new RetryLink({attempts: {max: Infinity}});

  const user = cache.readQuery({query: GET_AUTH_USER});
  console.log(user);
  const authToken = '';

  const httpLink = new HttpLink({
    uri: url,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : null,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const link = ApolloLink.from([retryLink, httpLink]);

  const client = new ApolloClient({
    link,
    cache,
    resolvers,
    typeDefs,
  });

  return client;
};

export {getApolloClient};
