import AsyncStorage from '@react-native-community/async-storage';
import {ApolloClient, ApolloLink, HttpLink} from 'apollo-boost';
import {setContext} from 'apollo-link-context';
import {RetryLink} from 'apollo-link-retry';
import {resolvers} from './resolvers';
import {typeDefs} from './typeDefs';

const getApolloClient = (cache: any) => {
  const url = 'https://pauzr.tk/graphql';
  // const url = 'https://vapor.test/graphql-playground';

  const retryLink = new RetryLink({attempts: {max: Infinity}});

  const authMiddleware = setContext(async (req, {headers}) => {
    const token = await AsyncStorage.getItem('token');

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const httpLink = new HttpLink({
    uri: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const link = ApolloLink.from([retryLink, authMiddleware, httpLink]);

  const client = new ApolloClient({
    link,
    cache,
    resolvers,
    typeDefs,
  });

  return client;
};

export {getApolloClient};
