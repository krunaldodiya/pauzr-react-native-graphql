import AsyncStorage from '@react-native-community/async-storage';
import {ApolloClient, ApolloLink, HttpLink} from 'apollo-boost';
import {setContext} from 'apollo-link-context';
import {RetryLink} from 'apollo-link-retry';
import {httpUrlProd} from '../libs/vars';
import {resolvers} from './resolvers';
import {typeDefs} from './typeDefs';

const getApolloClient = (cache: any) => {
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
    uri: httpUrlProd,
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
