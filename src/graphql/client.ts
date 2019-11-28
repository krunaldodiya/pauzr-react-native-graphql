import AsyncStorage from '@react-native-community/async-storage';
import {ApolloClient, ApolloLink, HttpLink} from 'apollo-boost';
import {setContext} from 'apollo-link-context';
import {onError} from 'apollo-link-error';
import QueueLink from 'apollo-link-queue';
import {RetryLink} from 'apollo-link-retry';
import SerializingLink from 'apollo-link-serialize';
import Pusher from 'pusher-js/react-native';
import {cache} from '../graphql/cache';
import PusherLink from '../libs/pusher';
import {httpUrlProd} from '../libs/vars';
import {resolvers} from './resolvers';
import {typeDefs} from './typeDefs';

const getApolloClient = () => {
  const errorLink = onError(data => {
    console.log(data);
  });

  const retryLink = new RetryLink({attempts: {max: Infinity}});
  const queueLink = new QueueLink();
  const serializingLink = new SerializingLink();

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

  const pusherLink = new PusherLink({
    pusher: new Pusher('abd0716eddc0702f68a4', {
      cluster: 'ap2',
      authEndpoint: `${httpUrlProd}/subscriptions/auth`,
      // auth: {
      //   headers: {
      //     authorization: `Bearer ${token}`,
      //   },
      // },
    }),
  });

  const link = ApolloLink.from([
    errorLink,
    retryLink,
    queueLink,
    serializingLink,
    authMiddleware,
    pusherLink,
    httpLink,
  ]);

  const client = new ApolloClient({
    link,
    cache,
    resolvers,
    typeDefs,
  });

  return client;
};

export {getApolloClient};
