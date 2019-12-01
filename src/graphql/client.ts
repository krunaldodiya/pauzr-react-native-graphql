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

  // const token =
  //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ3JhcGhxbC5wYXV6ci5jb21cL2dyYXBocWwiLCJpYXQiOjE1NzQ4NjExMzMsImV4cCI6MTYwNjM5NzEzMywibmJmIjoxNTc0ODYxMTMzLCJqdGkiOiJsanZGWlI2VWVvM1NNN1BOIiwic3ViIjoiNDNlMjYzNGQtZDI4NC00NGZiLWIwMWUtMDRhODA1YjlmYjQ3IiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.5jrqMYUj8NUKjgsZgo4E2PXRiwhAsYRrbwSygrk1fi4';

  const pusherLink = new PusherLink({
    pusher: new Pusher('60d3868f66b0ab455b41', {
      cluster: 'ap2',
      authEndpoint: `${httpUrlProd}/subscriptions/auth`,
      disableStats: true,
      // auth: {
      //   headers: {
      //     authorization: token ? `Bearer ${token}` : null,
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
