import AsyncStorage from '@react-native-community/async-storage';
import {ApolloClient, ApolloLink, HttpLink} from 'apollo-boost';
import {RetryLink} from 'apollo-link-retry';
import {resolvers} from './resolvers';
import {typeDefs} from './typeDefs';

const getApolloClient = (cache: any) => {
  const url = 'https://pauzr.tk/graphql';
  // const url = 'https://vapor.test/graphql-playground';

  const retryLink = new RetryLink({attempts: {max: Infinity}});

  const contextLink = new ApolloLink((operation, forward) => {
    const token = AsyncStorage.getItem('token') || null;

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });

    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const link = ApolloLink.from([retryLink, contextLink, httpLink]);

  const client = new ApolloClient({
    link,
    cache,
    resolvers,
    typeDefs,
  });

  return client;
};

export {getApolloClient};
