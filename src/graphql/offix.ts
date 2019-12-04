import AsyncStorage from '@react-native-community/async-storage';
import {HttpLink, InMemoryCache} from 'apollo-boost';
import {ApolloLink} from 'apollo-link';
import {setContext} from 'apollo-link-context';
import {ApolloOfflineClient} from 'offix-client';
import Pusher from 'pusher-js/react-native';
import PusherLink from '../libs/pusher';
import {httpUrlProd} from '../libs/vars';
import ReactNativeNetworkStatus from './network';

const cacheStorage = {
  getItem: async (key: any) => {
    const data = await AsyncStorage.getItem(key);
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  },
  setItem: (key: any, value: any) => {
    let valueStr = value;
    if (typeof valueStr === 'object') {
      valueStr = JSON.stringify(value);
    }
    return AsyncStorage.setItem(key, valueStr);
  },
  removeItem: (key: any) => {
    return AsyncStorage.removeItem(key);
  },
};

const authLink = setContext(async (req, {headers}) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const pusher = new Pusher('60d3868f66b0ab455b41', {
  cluster: 'ap2',
  authEndpoint: `${httpUrlProd}/subscriptions/auth`,
});

const pusherLink = new PusherLink({
  pusher,
});

const httpLink = new HttpLink({
  uri: httpUrlProd,
});

const link = ApolloLink.from([authLink, pusherLink, httpLink]);

export const offixClient = new ApolloOfflineClient({
  cache: new InMemoryCache(),
  link,
  offlineStorage: cacheStorage,
  cacheStorage,
  networkStatus: new ReactNativeNetworkStatus(),
  retryOptions: {
    attempts: {max: Infinity},
  },
  offlineQueueListener: {
    onOperationEnqueued: (entry: any) => {
      console.log(entry);
    },
  },
});
