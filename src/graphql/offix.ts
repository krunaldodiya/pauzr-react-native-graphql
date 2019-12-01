import AsyncStorage from '@react-native-community/async-storage';
import {HttpLink} from 'apollo-boost';
import {ApolloLink} from 'apollo-link';
import {setContext} from 'apollo-link-context';
import {OfflineClient} from 'offix-client';
import Pusher from 'pusher-js/react-native';
import PusherLink from '../libs/pusher';
import {httpUrlProd} from '../libs/vars';
import ReactNativeNetworkStatus from './network';

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

export const offixClient = new OfflineClient({
  terminatingLink: link,
  storage: {
    getItem: key => AsyncStorage.getItem(key),
    setItem: (key, value) => AsyncStorage.setItem(key, JSON.stringify(value)),
    removeItem: key => AsyncStorage.removeItem(key),
  },
  networkStatus: new ReactNativeNetworkStatus(),
});
